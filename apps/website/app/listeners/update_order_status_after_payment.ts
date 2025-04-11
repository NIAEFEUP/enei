import type PaymentStatusUpdated from "#events/payment_status_updated";
import type { ReadonlyPayment } from "#models/payment";

export default class UpdateOrderStatusAfterPayment {
  async handle(event: PaymentStatusUpdated) {
    const payment = event.payment.readonly();

    // if (payment.status === "successful") {
    //     return this.handleSuccess(payment);
    //     // await payment.order.updateStatus("delivered");
    // } else if (payment.status === "expired") {

    // } else if (payment.status === "declined") {

    // } else if (payment.status === "pending") {

    // }
  }

  async handleSuccess(payment: ReadonlyPayment & { status: "successful" }) {}
}
