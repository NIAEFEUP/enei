import type { HttpContext } from '@adonisjs/core/http'
import env from '#start/env'
import axios from 'axios'
import Order from '#models/order'
import User from '#models/user'
import OrderProduct from '#models/order_product'
import Product from '#models/product'
import ProductGroup from '#models/product_group'
import { createMBWayOrderValidator } from '#validators/order'
import UpdateOrderStatus from '../jobs/update_order_status.js'
export default class OrdersController {
  index({ inertia }: HttpContext) {
    return inertia.render('payments')
  }

  public async createMBWay({ request, auth, response }: HttpContext) {
    const authUser = auth.user

    try {
      // Validate input format
      await request.validateUsing(createMBWayOrderValidator)

      const { userId, products, name, nif, address, mobileNumber } = request.all()
   
      // Validate authentication

      if (!authUser || authUser.id !== userId) {
        return response.status(401).json({ message: 'Não autorizado' })
      }

      // Validate user existence

      const user = await User.find(userId)

      if (!user) {
        return response.status(404).json({ message: 'Utilizador não encontrado' })
      }

      let totalAmount = 0
      let description = ''

      const productDetails = []

      for (const productItem of products) {
        const { productId, quantity } = productItem
        const product = await Product.find(productId)

        if (!product) {
          return response
            .status(404)
            .json({ message: `Produto com id ${productId} não foi encontrado` })
        }

        const successfulOrdersOfGivenProduct = await OrderProduct.query()
          .join('orders', 'order_products.order_id', 'orders.id')
          .where('order_products.product_id', productId)
          .whereIn('orders.status', ['Success', 'Pending'])

        const successfulOrdersOfGivenProductPerUser = await OrderProduct.query()
          .join('orders', 'order_products.order_id', 'orders.id')
          .where('orders.user_id', userId)
          .where('order_products.product_id', productId)
          .whereIn('orders.status', ['Success', 'Pending'])

        const stockUsed = successfulOrdersOfGivenProduct.reduce(
          (acc, orderProduct) => acc + orderProduct.quantity,
          0
        )

        const totalQuantity = successfulOrdersOfGivenProductPerUser.reduce(
          (acc, orderProduct) => acc + orderProduct.quantity,
          0
        )

        if (product.stock < quantity + stockUsed) {
          return response
            .status(400)
            .json({ message: `Não há mais stock do produto ${product.name}` })
        }

        if (quantity + totalQuantity > product.max_order) {
          return response.status(400).json({
            message: `Apenas podes comprar ${product.max_order} do produto ${product.name}`,
          })
        }

        const productGroup = await ProductGroup.find(product.productGroupId)
        if(productGroup){

          const sucessfulOrdersOfGivenGroup = await OrderProduct.query()
            .join('orders', 'order_products.order_id', 'orders.id')
            .join('products', 'order_products.product_id', 'products.id')
            .where('orders.user_id', userId)
            .where('products.product_group_id', product.productGroupId)
            .where('orders.status', 'Success')

          

          const totalGroupQuantity = sucessfulOrdersOfGivenGroup.reduce(
            (acc, orderProduct) => acc + orderProduct.quantity,
            0
          )

          if (totalGroupQuantity + quantity > productGroup.maxAmountPerGroup) {
            return response.status(400).json({
              message: `Apenas podes comprar ${productGroup?.maxAmountPerGroup} produtos do grupo ${productGroup.name}`,
            })

          }
        }
        productDetails.push({ product, quantity })
        totalAmount += product.price * quantity
        description += `${product.name} x${quantity}, `
      }

      description = `Payment for order: ${description.slice(0, -2)}`

      // Create the order and associated products
      const order = await Order.create({ userId, name, nif, address })

      for (const { product, quantity } of productDetails) {
        await OrderProduct.create({
          orderId: order.id,
          productId: product.id,
          quantity,
        })
      }

      // Prepare payment data

      const data = {
        mbWayKey: env.get('IFTHENPAY_MBWAY_KEY'),
        orderId: order.id,
        amount: totalAmount.toFixed(2),
        mobileNumber,
        description,
      }

      // Call payment API

      const apiResponse = await axios.post('https://api.ifthenpay.com/spg/payment/mbway', data)

      if (apiResponse.status === 200) {
        const responseData = apiResponse.data
        order.requestId = responseData.RequestId
        order.status = 'Pending'
        order.total = totalAmount
        await order.save()

        // Dispatch background job to update order status

        await UpdateOrderStatus.dispatch(
          { requestId: order.requestId, email: authUser.email },
          { delay: 10000 }
        ).catch((error) => {
          console.error('Error dispatching job', error)
        })

        return response.status(200).json({
          order,
          message: 'Payment initiated successfully',
        })
      } else {
        return response.status(500).json({ message: 'Failed to initiate payment' })
      }
    } catch (error) {
      console.error(error)
      return response.status(500).json({
        message: 'An error occurred while initiating the payment',
      })
    }
  }

  public async show({ inertia, params, auth, response }: HttpContext) {
    const authUser = auth.user
    if (!authUser) {
      return response.status(401).json({
        message: 'Unauthorized',
      })
    }
    
    const order = await Order.find(params.id)
    if (!order || (order.userId !== authUser.id)) {
      return response.notFound({ message: 'Order not found' })
    }
    return inertia.render('payments/show', { order })
  }
}
