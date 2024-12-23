import type { HttpContext } from '@adonisjs/core/http'
import env from '#start/env'
import axios from 'axios'
import Order from '#models/order'
import OrderProduct from '#models/order_product'
import Product from '#models/product'
import UpdateOrderStatus from '../jobs/update_order_status.js'

export default class OrdersController {

      public async create({ request, response }: HttpContext) {
        try {
          const { user_id, products, nif, address, mobileNumber } = request.all()
          const order = await Order.create({ user_id, nif, address })
          let totalAmount = 0
          let description = 'Payment for order id ' + order.id

          for (let productItem of products) {
            const { product_id, quantity } = productItem
            const product = await Product.find(product_id)
    
            if (!product) {
              return response.status(404).json({
                message: `Product with id ${product_id} not found`,
              })
            }

            const productTotal = product.price * quantity
            totalAmount += productTotal
            await OrderProduct.create({
                orderId: order.id,
                productId: product_id, 
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
            order.request_id = responseData.RequestId
            order.status = 'Pending'
            await order.save()

            await UpdateOrderStatus.dispatch({ requestId: order.request_id }, { delay: 10000 })
    
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
            order
        })
    }
    
    

}