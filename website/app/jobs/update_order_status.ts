import { Job } from 'adonisjs-jobs'

type UpdateOrderStatusPayload = {}

export default class UpdateOrderStatus extends Job {
    async handle(payload: UpdateOrderStatusPayload) {
        this.logger.info('UpdateOrderStatus job handled')
    }
}