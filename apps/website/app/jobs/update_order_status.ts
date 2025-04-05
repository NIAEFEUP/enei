import { Job } from "adonisjs-jobs";
import ConfirmPaymentNotification from "#mails/confirm_payment_notification";
import mail from "@adonisjs/mail/services/main";
import User from "#models/user";
import Payment from "#models/payment";
import { PaymentService } from "#services/payment_service";
import OrderProduct from "#models/order_product";
import app from "@adonisjs/core/services/app";

type UpdateOrderStatusPayload = {
  paymentId: number;
  email: string;
};

export default class UpdateOrderStatus extends Job {
  async handle({ paymentId, email }: UpdateOrderStatusPayload) {
    try {
      const payment = await Payment.findOrFail(paymentId);

      this.logger.debug(`Processing status update for payment: ${payment}`);

      if (payment.status !== "successful") {
        this.logger.debug(`Payment status did not change: ${payment.status}`);
        return;
      }

      const paymentStatus = await PaymentService.getStatus(payment);
      if (paymentStatus === "successful") {
        payment.order.status = "delivered";
        await payment.order.save();

        const orderProducts = await OrderProduct.query()
          .where("order_id", payment.order.id)
          .preload("product");

        await mail.send(
          new ConfirmPaymentNotification(
            email,
            orderProducts.map((orderProduct) => ({
              id: orderProduct.product.id,
              name: orderProduct.product.name,
              price: orderProduct.product.price.toCents(),
              quantity: orderProduct.quantity,
            })),
            payment.amount.toCents(),
            payment.order.id,
          ),
        );

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

      await UpdateOrderStatus.dispatch({ paymentId, email }, { delay: 10000 });
    }
  }
}
