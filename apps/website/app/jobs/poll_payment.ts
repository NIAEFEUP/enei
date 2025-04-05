import { Job } from "adonisjs-jobs";
import ConfirmPaymentNotification from "#mails/confirm_payment_notification";
import mail from "@adonisjs/mail/services/main";
import User from "#models/user";
import Payment from "#models/payment";
import OrderProduct from "#models/order_product";
import app from "@adonisjs/core/services/app";
import { PaymentService } from "#services/payment_service";

type PollPaymentPayload = {
  paymentId: number;
  baseUrl: string;
};

export default class PollPayment extends Job {
  async handle({ paymentId, baseUrl }: PollPaymentPayload) {
    const paymentsService = await app.container.make(PaymentService);
    const payment = await Payment.findOrFail(paymentId);

    const logger = this.logger.child({ paymentId });

    logger.debug("Polling payment...");

    if (payment.status !== "pending") {
      this.logger.debug("Payment is no longer pending, stopping...");
      return;
    }
    try {
      const paymentStatus = await paymentsService.getStatus(payment);
      if (paymentStatus === "successful") {
        payment.order.status = "delivered";
        await payment.order.save();

        const orderProducts = await OrderProduct.query()
          .where("order_id", payment.order.id)
          .preload("product");

        // await mail.send(
        //   new ConfirmPaymentNotification(
        //     email,
        //     orderProducts.map((orderProduct) => ({
        //       id: orderProduct.product.id,
        //       name: orderProduct.product.name,
        //       price: orderProduct.product.price.toCents(),
        //       quantity: orderProduct.quantity,
        //     })),
        //     payment.amount.toCents(),
        //     payment.order.id,
        //   ),
        // );

        const user = await User.find(payment.order.userId);
        if (user) {
          await user.load("participantProfile");
          const participantProfile = user.participantProfile;
          if (participantProfile) {
            // FIXME - this is a hack
            participantProfile.purchasedTicket = "early-bird-with-housing";
            await participantProfile.save();
          }
        }
      }
    } catch (error) {
      this.logger.error(`Error updating order status: ${error.message}`);
      console.error(`Error updating order status: ${error.message}`);

      // await PollPayment.dispatch({ paymentId, email }, { delay: 10000 });
    }
  }
}
