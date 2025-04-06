import BasePaymentProvider, { type CreatePaymentHandleOptions } from "./base.js";
import * as ifthenpay from "#lib/payments/api/ifthenpay.js";

export type IfthenpayPaymentResult = Awaited<ReturnType<(typeof ifthenpay)["checkPayment"]>>;

export default class IfthenpayPaymentProvider extends BasePaymentProvider<
  string,
  IfthenpayPaymentResult
> {
  #mbwayKey;

  constructor(mbwayKey: string) {
    super();
    this.#mbwayKey = mbwayKey;
  }

  override async createPaymentHandle(opts: CreatePaymentHandleOptions) {
    const payment = await ifthenpay.createNewPayment({
      mbWayKey: this.#mbwayKey,
      orderId: opts.payment.id,
      amount: opts.payment.total.toEuros().toFixed(2),
      mobileNumber: opts.phoneNumber,
      description: opts.description,
    });

    return payment.requestId;
  }

  override async checkPayment(requestId: string) {
    return await ifthenpay.checkPayment({
      mbWayKey: this.#mbwayKey,
      requestId,
    });
  }
}
