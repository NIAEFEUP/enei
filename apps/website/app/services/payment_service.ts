import type Order from "#models/order";

import env from "#start/env";
import axios from "axios";
import PollPaymentJob from "../jobs/poll_payment.js";
import db from "@adonisjs/lucid/services/db";
import InvoiceInfo from "#models/invoice_info";
import Payment, { type PaymentStatus } from "#models/payment";
import { Money } from "#lib/payments/money.js";
import app from "@adonisjs/core/services/app";
import { paymentValidator } from "#validators/payment";

type PaymentData = {
  mbWayKey: string;
  orderId: number;
  amount: number;
  mobileNumber: string;
  description: string;
};

type UserMetadata = {
  name?: string;
  nif?: string;
  address?: string;
};

export class PaymentService {
  async create(
    order: Order,
    productAmount: Money,
    mobileNumber: string,
    description: string,
    email: string,
    nif?: string,
    address?: string,
    name?: string,
  ) {
    const data = {
      mbWayKey: env.get("IFTHENPAY_MBWAY_KEY"),
      orderId: order.id,
      amount: productAmount.toEuros(),
      mobileNumber,
      description,
    };

    const userMetadata = {
      description,
      email,
      nif,
      address,
      name,
    };

    await this.issuePayment(order, data, userMetadata);
  }

  async issuePayment(order: Order, data: PaymentData, userMetadata: UserMetadata) {
    console.log("DATA: ", data);
    const apiResponse = await axios.post("https://api.ifthenpay.com/spg/payment/mbway", data);

    if (apiResponse.status === 200) {
      const { RequestId } = apiResponse.data;

      const paymentId = await db.transaction(async (trx) => {
        const invoiceInfo = await InvoiceInfo.create(
          {
            name: userMetadata.name,
            nif: userMetadata.nif,
            address: userMetadata.address,
            frozen: false,
          },
          { client: trx },
        );

        const payment = await Payment.create(
          {
            status: "pending",
            requestId: RequestId,
            amount: Money.fromEuros(data.amount),
            orderId: order.id,
            invoiceInfoId: invoiceInfo.id,
            reason: null,
          },
          { client: trx },
        );

        return payment.id;
      });

      order.status = "pending-payment";
      await order.save();

      await PollPaymentJob.dispatch(
        { paymentId: paymentId, baseUrl: "123" },
        { delay: 10000 },
      ).catch((error) => {
        console.error("Error dispatching job", error);
      });
    }
  }

  async getStatus(payment: Payment): Promise<PaymentStatus> {
    const apiResponse = await axios.get(
      `https://api.ifthenpay.com/spg/payment/mbway/status?mbWayKey=${env.get("IFTHENPAY_MBWAY_KEY")}&requestId=${payment.requestId}`,
    );

    if (apiResponse.status === 200) {
      const { status } = await paymentValidator.validate(apiResponse.data.Message);
      if (status) {
        if (app.inDev) {
          return "successful";
        }

        return status.status;
      }
    }

    return "unknown";
  }
}
