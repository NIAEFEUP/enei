import vine from "@vinejs/vine";

export const createMBWayOrderValidator = vine.compile(
  vine.object({
    products: vine.array(
      vine.object({
        productId: vine.number(),
        quantity: vine.number(),
      }),
    ),
    name: vine.string().optional(),
    nif: vine.string().optional(),
    address: vine.string().optional(),
    mobileNumber: vine.string(),
  }),
);

export const eventMBWayOrderValidator = vine.compile(
  vine.object({
    products: vine
      .array(
        vine.object({
          productId: vine.number(),
          quantity: vine.number(),
        }),
      )
      .optional(),
    name: vine.string().optional(),
    nif: vine.string().optional(),
    address: vine.string().optional(),
    mobileNumber: vine.string().optional(),
  }),
);
