import type { PaymentStatus } from "#models/payment";
import vine from "@vinejs/vine";

const map: Record<string, { status: PaymentStatus; reason?: string | null }> = {
  "Success": { status: "successful" },
  "Declined by user": { status: "declined", reason: "user" },
  "Declined": { status: "declined" },
  "Expired": { status: "expired" },
};

export const paymentValidator = vine.compile(
  vine.object({
    status: vine
      .string()
      .in(["Success", "Declined by user", "Declined", "Expired"])
      .transform((value) => {
        return map[value];
      }),
  }),
);
