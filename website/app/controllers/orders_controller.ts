import type { HttpContext } from '@adonisjs/core/http'
import env from '#start/env'
import axios from 'axios'
import Order from '#models/order'
import Product from '#models/product'
import UpdateOrderStatus from '../jobs/update_order_status.js'

export default class OrdersController {

    public async create({ request, response }: HttpContext) {
        try{
            const { user_id, product_id,quantity, nif, address, mobileNumber } = request.all()
            const order = await Order.create({ user_id, product_id, quantity, nif, address })
            const product = await Product.find(product_id)
            if(!product){
                return response.status(404).json({
                    message: 'Product not found',
                })
            }
            const total = product.price * quantity
            const description = 'Payment for ' + product.name + ' order if ' + order.id
            const data = {
              mbWayKey: env.get('IFTHENPAY_MBWAY_KEY'),
              orderId: order.id,
              amount: total.toFixed(2),
              mobileNumber,
              description,
            }           
            const apiResponse = await axios.post('https://api.ifthenpay.com/spg/payment/mbway', data)
            console.log("after axios")
            if (apiResponse.status === 200) {
                console.log("Starting update")
                const responseData = apiResponse.data
                order.request_id = responseData.RequestId
                order.status = "Pending"
                await order.save()
                await UpdateOrderStatus.dispatch({ requestId: order.request_id }, { delay: 10000});
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