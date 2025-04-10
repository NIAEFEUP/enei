import type { PaymentStatus } from "#models/payment";
import vine from "@vinejs/vine";
import type { Simplify } from "../../types/utils.js";

const map: Record<string, { status: PaymentStatus; reason?: string | null }> = {
  "Success": { status: "successful" },
  "Declined by user": { status: "declined", reason: "user" },
  "Declined": { status: "declined" },
  "Expired": { status: "expired" },
};

export const paymentValidator = vine.compile(
  vine.object({
    info: vine
      .string()
      .in(["Success", "Declined by user", "Declined", "Expired"])
      .transform((value) => {
        return map[value];
      }),
  }),
);

export const paymentCallbackValidator = vine.compile(
  vine.object({
    requestId: vine.number().exists({ column: "request_id", table: "payments" }),
  })
  .merge(
    vine.group([
      vine.group.if(
        (value) => 'status' in value && value.status === "declined",
        {
          status: vine.literal("declined"),
          reason: vine.string().optional(),
        },
      ),
      vine.group.if(
        (value) => 'status' in value && value.status === "unknown",
        {
          status: vine.literal("unknown"),
          reason: vine.string(),
        },
      ),
      vine.group.else({
        status: vine.enum(["pending", "successful", "expired"]),
        reason: vine.literal(undefined).optional(),
      })
    ]),
  )
);
