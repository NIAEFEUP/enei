import type { HttpContext } from '@adonisjs/core/http'
import env from '#start/env'
import axios from 'axios'
import Order from '#models/order'
import User from '#models/user'
import OrderProduct from '#models/order_product'
import Product from '#models/product'
import UpdateOrderStatus from '../jobs/update_order_status.js'

export default class OrdersController {
  index({ inertia }: HttpContext) {
    return inertia.render('payments/index')
  }

  public async createMBWay({ request, auth, response }: HttpContext) {
    const authUser = auth.user
    try {
      const { userId, products, nif, address, mobileNumber } = request.all()
      if (!authUser || authUser.id !== userId) {
        return response.status(401).json({
          message: 'Unauthorized',
        })
      }
      if (!userId || !products || !mobileNumber) {
        return response.status(400).json({
          message: 'Missing required fields',
        })
      }

      const user = await User.find(userId)
      if (!user) {
        return response.status(404).json({
          message: 'User not found',
        })
      }
      const order = await Order.create({ userId, nif, address })
      let totalAmount = 0
      let description = 'Payment for order id ' + order.id

      for (let productItem of products) {
        const { productId, quantity } = productItem
        const product = await Product.find(productId)

        if (!product) {
          return response.status(404).json({
            message: `Product with id ${productId} not found`,
          })
        }
        const productsUserHas = await OrderProduct.query()
          .where('productId', productId)
          .where('orderId', order.id)
        if (product.stock < quantity) {
          return response.status(400).json({
            message: `Not enough stock for product ${product.name}`,
          })
        }
        if (quantity + productsUserHas.length > product.max_order) {
          return response.status(400).json({
            message: `You can only buy ${product.max_order} of product ${product.name}`,
          })
        }

        const productTotal = product.price * quantity
        totalAmount += productTotal
        await OrderProduct.create({
          orderId: order.id,
          productId: productId,
          quantity,
        })

        description += `, ${product.name} x${quantity}`
      }

      const data = {
        mbWayKey: env.get('IFTHENPAY_MBWAY_KEY'),
        orderId: order.id,
        amount: totalAmount.toFixed(2),
        mobileNumber,
        description,
      }

      const apiResponse = await axios.post('https://api.ifthenpay.com/spg/payment/mbway', data)

      if (apiResponse.status === 200) {
        const responseData = apiResponse.data
        order.requestId = responseData.RequestId
        order.status = 'Pending'
        await order.save()

        await UpdateOrderStatus.dispatch(
          { requestId: order.requestId, email: authUser.email },
          { delay: 10000 }
        )

        return response.status(200).json({
          order,
          message: 'Payment initiated successfully',
        })
      } else {
        return response.status(500).json({
          message: 'Failed to initiate payment',
        })
      }
    } catch (error) {
      console.error(error)
      return response.status(500).json({
        message: 'An error occurred while initiating the payment',
      })
    }
  }

  public async show({ params, response }: HttpContext) {
    const order = await Order.find(params.id)
    if (!order) {
      return response.status(404).json({
        message: 'Order not found',
      })
    }
    return response.status(200).json({
      order,
    })
  }
}
