import axios from "axios";
import Order from "#models/order";
import env from "#start/env";
import { Job } from "adonisjs-jobs";
import ConfirmPaymentNotification from "#mails/confirm_payment_notification";
import mail from "@adonisjs/mail/services/main";
import db from "@adonisjs/lucid/services/db";
import app from "@adonisjs/core/services/app";
import User from "#models/user";
import { createTuyau } from "@tuyau/client";
import { Env } from "@adonisjs/core/env";

type UpdateOrderStatusPayload = {
  requestId: string;
  email: string;
};

export default class UpdateOrderStatus extends Job {
  async handle({ requestId, email }: UpdateOrderStatusPayload) {
    const { api } = await import("#.adonisjs/api");

    try {
      this.logger.info(`Processing status update for requestId: ${requestId}`);

      // Fetch the order based on the requestId
      const order = await Order.query().where("request_id", requestId).first();
      if (!order) {
        this.logger.error(`Order with requestId ${requestId} not found`);
        console.error(`Order with requestId ${requestId} not found`);
        return;
      }

      if (order.status !== "Pending") {
        this.logger.info(`Order status is no longer pending: ${order.status}`);
        return; // Exit if the status is no longer "Pending"
      }

      const apiResponse = await axios.get(
        `https://api.ifthenpay.com/spg/payment/mbway/status?mbWayKey=${env.get("IFTHENPAY_MBWAY_KEY")}&requestId=${requestId}`,
      );

      if (apiResponse.status === 200) {
        let status = apiResponse.data.Message;
        if (status) {
          if (app.inDev) {
            status = "Success";
          }

          if (status === "Pending") {
            await UpdateOrderStatus.dispatch({ requestId, email }, { delay: 10000 }); // Retry after 5 seconds
            this.logger.info(`Requeued job for requestId: ${requestId}`);
            return;
          }
          order.status = status;
          await order.save();
          this.logger.info(`Order status updated to: ${order.status}`);
          if (order.status === "Success") {
            this.logger.info(`Gonna send mail: ${order.status}`);
            const products = await db
              .from("products")
              .join("order_products", "products.id", "order_products.product_id")
              .where("order_products.order_id", order.id)
              .select("products.*", "order_products.quantity as quantity");

            const total = order.total;
            const orderId = order.id;

            await mail.send(new ConfirmPaymentNotification(email, products, total, orderId));

            const user = await User.find(order.userId);
            if (user) {
              await user.load("participantProfile");
              const participantProfile = user.participantProfile;
              if (participantProfile) {
                // FIXME - this is a hack
                participantProfile.purchasedTicket = "early-bird-with-housing";
                await participantProfile.save();
              }
            }

            const tuyau = createTuyau({
              api,
              baseUrl: new Env(env).get("INERTIA_PUBLIC_APP_URL") ?? "",
            });

            await axios.post(
              tuyau.$url("actions:referrals.event.pointattribution.trigger", {
                params: { id: order.userId },
              }),
              { apiKey: new Env(env).get("JOBS_API_KEY") },
              { withXSRFToken: true, withCredentials: true },
            );
          }
        } else {
          await UpdateOrderStatus.dispatch({ requestId, email }, { delay: 10000 }); // Retry after 5 seconds
        }
      } else {
        this.logger.error(`Failed to fetch payment status for requestId: ${requestId}`);
        console.error(`Failed to fetch payment status for requestId: ${requestId}`);
        await UpdateOrderStatus.dispatch({ requestId, email }, { delay: 10000 }); // Retry after 5 seconds
      }
    } catch (error) {
      this.logger.error(`Error updating order status: ${error.message}`);
      console.error(`Error updating order status: ${error.message}`);

      await UpdateOrderStatus.dispatch({ requestId, email }, { delay: 10000 });
    }
  }
}
