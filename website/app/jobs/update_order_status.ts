import axios from 'axios'
import Order from '#models/order'
import env from '#start/env'
import { Job } from 'adonisjs-jobs'
import ConfirmPaymentNotification from '#mails/confirm_payment_notification'
import mail from '@adonisjs/mail/services/main'

type UpdateOrderStatusPayload = {
  requestId: string
  email: string
}

export default class UpdateOrderStatus extends Job {
  async handle({ requestId, email }: UpdateOrderStatusPayload) {
    try {
      this.logger.info(`Processing status update for requestId: ${requestId}`)

      // Fetch the order based on the requestId
      const order = await Order.query().where('request_id', requestId).first()
      if (!order) {
        this.logger.error(`Order with requestId ${requestId} not found`)
        console.error(`Order with requestId ${requestId} not found`)
        return
      }

      if (order.status !== 'Pending') {
        this.logger.info(`Order status is no longer pending: ${order.status}`)
        return // Exit if the status is no longer "Pending"
      }
      const apiResponse = await axios.get(
        `https://api.ifthenpay.com/spg/payment/mbway/status?mbWayKey=${env.get('IFTHENPAY_MBWAY_KEY')}&requestId=${requestId}`
      )

      if (apiResponse.status === 200) {
        const status = apiResponse.data.Message
        if (status) {
          if (status === 'Pending') {
            await UpdateOrderStatus.dispatch({ requestId, email }, { delay: 10000 }) // Retry after 5 seconds
            this.logger.info(`Requeued job for requestId: ${requestId}`)
          }
          order.status = status
          await order.save()
          this.logger.info(`Order status updated to: ${order.status}`)
          if (status === 'Success') {
            this.logger.info(`Gonna send mail: ${order.status}`)
            await mail.send(new ConfirmPaymentNotification(email))
          }
        } else {
          await UpdateOrderStatus.dispatch({ requestId, email }, { delay: 10000 }) // Retry after 5 seconds
        }
      } else {
        this.logger.error(`Failed to fetch payment status for requestId: ${requestId}`)
        console.error(`Failed to fetch payment status for requestId: ${requestId}`)
        await UpdateOrderStatus.dispatch({ requestId, email }, { delay: 10000 }) // Retry after 5 seconds
      }
    } catch (error) {
      this.logger.error(`Error updating order status: ${error.message}`)
      console.error(`Error updating order status: ${error.message}`)

      await UpdateOrderStatus.dispatch({ requestId, email }, { delay: 10000 })
    }
  }
}
