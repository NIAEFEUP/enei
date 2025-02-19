import Product from '#models/product'
import vine from '@vinejs/vine'
import type { FieldContext } from '@vinejs/vine/types'

vine.convertEmptyStringsToNull = true

const productMustExist = vine.createRule(async (value, options, field: FieldContext) => {
  const product = await Product.findBy('id', value)
  if (!product) {
    field.report(
        'O produto não existe',
        'product_must_exist',
        field
    )
  }
})

export const storeValidator = vine.compile(
  vine.object({
    productId: vine.number().use(
        productMustExist()
    ),
    cost: vine.number().min(0)
  })
)

