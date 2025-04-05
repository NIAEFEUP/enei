import type { Money } from "../money.js";

export type CreatePaymentHandleOptions = {
  phoneNumber: string;
  total: Money;
  description: string;
};

export default abstract class BasePaymentProvider<Handle, Result> {
  abstract createPaymentHandle(opts: CreatePaymentHandleOptions): Promise<Handle>;
  abstract checkPayment(handle: Handle): Promise<Result>;
}
