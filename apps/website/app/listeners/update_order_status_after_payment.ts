import type PaymentStatusUpdated from "#events/payment_status_updated";

export default class UpdateOrderStatusAfterPayment {
    async handle(event: PaymentStatusUpdated) {
        const payment = event.payment.readonly();

        if (payment.status === "successful") {
            // await payment.order.updateStatus("delivered");
        }
    }
}