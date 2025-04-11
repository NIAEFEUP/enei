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
  static async create(
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

    await PaymentService.issuePayment(order, data, userMetadata);
  }

  static async issuePayment(order: Order, data: PaymentData, userMetadata: UserMetadata) {
    const apiResponse = await axios.post("https://api.ifthenpay.com/spg/payment/mbway", data);

    if (apiResponse.status === 200) {
      const { RequestId } = apiResponse.data;

      const requestId = await db.transaction(async (trx) => {
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

        return payment.requestId;
      });

      order.status = "pending-payment";
      await order.save();

      await PollPaymentJob.dispatch(
        { requestId, baseUrl: env.get("INERTIA_PUBLIC_APP_URL") },
        { delay: 10000 },
      );
    }
  }

  async getStatus(requestId: string): Promise<PaymentStatus> {
    const apiResponse = await axios.get(
      `https://api.ifthenpay.com/spg/payment/mbway/status?mbWayKey=${env.get("IFTHENPAY_MBWAY_KEY")}&requestId=${requestId}`,
    );

    if (apiResponse.status === 200) {
      const { info } = await paymentValidator.validate({ info: apiResponse.data.Message });

      const { status } = info;

      if (status) {
        if (app.inDev) {
          return "successful";
        }

        return status;
      }
    }

    return "unknown";
  }
}
