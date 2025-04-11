import * as z from "zod";

// https://ifthenpay.com/docs/en/api/mbway/#tag/mb-way/POST/mbway
type CreateNewPaymentPayload = {
  mbWayKey: string;
  orderId: string;
  amount: string;
  mobileNumber: string;
  email?: string;
  description?: string;
};

const createNewPaymentValidator = z
  .object({
    RequestId: z.string(),
    Status: z.union([
      z.literal("-1").transform(() => "bad-request" as const),
      z.literal("000").transform(() => "issued" as const),
      z.literal("100").transform(() => "temporarily-unavailable" as const),
      z.literal("122").transform(() => "blocked" as const),
      z.literal("999").transform(() => "internal-error" as const),
    ]),
  })
  .transform((res) => ({ requestId: res.RequestId, status: res.Status }));

export async function createNewPayment(payload: CreateNewPaymentPayload) {
  const response = await fetch("https://api.ifthenpay.com/spg/payment/mbway", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  return createNewPaymentValidator.parseAsync(await response.json());
}

// https://ifthenpay.com/docs/en/api/mbway/#tag/mb-way/GET/mbway/status
type CheckPaymentPayload = {
  mbWayKey: string;
  requestId: string;
};

const checkPaymentValidator = z
  .object({
    CreatedAt: z.coerce.date(),
    Status: z.union([
      z.literal("-1").transform(() => "bad-request" as const),
      z.literal("000").transform(() => "approved" as const),
      z.literal("020").transform(() => "rejected" as const),
      z.literal("101").transform(() => "expired" as const),
      z.literal("122").transform(() => "blocked" as const),
      z.literal("123").transform(() => "not-found" as const),
    ]),
  })
  .transform((res) => ({ createdAt: res.CreatedAt, status: res.Status }));

export async function checkPayment(payload: CheckPaymentPayload) {
  const url = new URL("https://api.ifthenpay.com/spg/payment/mbway/status");
  url.search = new URLSearchParams(payload).toString();

  const response = await fetch(url);

  return checkPaymentValidator.parseAsync(await response.json());
}
