import vine from '@vinejs/vine'

export const createMBWayOrderValidator = vine.compile(
  vine.object({
    userId: vine.number(),
    products: vine.array(
      vine.object({
        productId: vine.number(),
        quantity: vine.number(),
      })
    ),
    nif: vine.string().optional(),
    address: vine.string().optional(),
    mobileNumber: vine.string(),
  })
)
