import { Job } from "adonisjs-jobs";
import Payment from "#models/payment";
import app from "@adonisjs/core/services/app";
import { PaymentService } from "#services/payment_service";
import { createTuyau as $createTuayu } from "@tuyau/client";
import env from "#start/env";

type PollPaymentPayload = {
  requestId: Payment["requestId"];
  baseUrl: string;
};

const apiKey = env.get("JOBS_API_KEY");

async function createTuyau(baseUrl: string) {
  const { api } = await import("#.adonisjs/api");
  return $createTuayu({ baseUrl, api });
}

export default class PollPayment extends Job {
  async handle({ requestId, baseUrl }: PollPaymentPayload) {
    const paymentsService = await app.container.make(PaymentService);

    const logger = this.logger.child({ requestId });
    logger.debug(PollPayment, "Polling payment...");

    const paymentStatus = await paymentsService.getStatus(requestId);
    logger.debug(PollPayment, "Payment status obtained", { paymentStatus });

    if (paymentStatus === "pending") {
      // If the payment is not yet completed, reschedule job and retry later
      await PollPayment.dispatch({ requestId, baseUrl }, { delay: 10000 });
      return;
    }

    const client = await createTuyau(baseUrl);
    await client.payment.callback.$post(
      {
        requestId,
        status: paymentStatus,
      },
      {
        headers: {
          "X-Authorization-Key": apiKey,
        },
      },
    );

    // if (payment.status !== "pending") {
    //   this.logger.debug("Payment is no longer pending, stopping...");
    //   return;
    // }

    // try {
    //   if (paymentStatus === "successful") {
    //     payment.order.status = "delivered";
    //     await payment.order.save();

    //     const orderProducts = await OrderProduct.query()
    //       .where("order_id", payment.order.id)
    //       .preload("product");

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

    //   const user = await User.find(payment.order.userId);
    //   if (user) {
    //     await user.load("participantProfile");
    //     const participantProfile = user.participantProfile;
    //     if (participantProfile) {
    //       // FIXME - this is a hack
    //       participantProfile.purchasedTicket = "early-bird-with-housing";
    //       await participantProfile.save();
    //     }
    //   }
    // }
    // } catch (error) {
    //   this.logger.error(`Error updating order status: ${error.message}`);
    //   console.error(`Error updating order status: ${error.message}`);
    // }
  }
}
