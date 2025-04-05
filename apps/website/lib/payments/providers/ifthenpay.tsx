import axios from "axios";
import BasePaymentProvider, { type CreatePaymentHandleOptions } from "./base.js";

type IfthenpayPaymentResult = {
  status: "success" | "expired" | "declined" | "declined-by-user";
};

export default class IfthenpayPaymentProvider extends BasePaymentProvider<
  string,
  IfthenpayPaymentResult
> {
  #mbwayKey;

  constructor(mbwayKey: string) {
    super();
    this.#mbwayKey = mbwayKey;
  }

  override async createPaymentHandle(_opts: CreatePaymentHandleOptions) {
    const apiResponse = await axios.post("https://api.ifthenpay.com/spg/payment/mbway", {
      mbWayKey: this.#mbwayKey,
    });

    throw new Error("Method not implemented.");
    return "";
  }

  override async checkPayment(handle: string) {
    throw new Error("Method not implemented.");
    return { status: "success" as const };
  }
}
