import logger from "@adonisjs/core/services/logger";
import BasePaymentProvider, { type CreatePaymentHandleOptions } from "./base.js";
import { randomBytes } from "crypto";
import app from "@adonisjs/core/services/app";

if (app.inDev) {
  throw new Error(
    "Dummy payment provider should not be used in production. Use a dynamic import if you need to mock payments.",
  );
}

export default class DummyPaymentProvider extends BasePaymentProvider<
  string,
  { status: "success" }
> {
  #handle: string;

  constructor() {
    super();
    this.#handle = randomBytes(16).toString("hex");
  }

  override async createPaymentHandle(opts: CreatePaymentHandleOptions) {
    logger.debug(DummyPaymentProvider, "creating payment handle", opts);
    return this.#handle;
  }

  override async checkPayment(handle: string) {
    logger.debug(DummyPaymentProvider, "checking payment status", handle);

    if (handle === this.#handle) {
      return { status: "success" as const };
    }

    throw new Error("Invalid handle");
  }
}
