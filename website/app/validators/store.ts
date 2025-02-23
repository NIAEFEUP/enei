import Product from '#models/product'
import vine from '@vinejs/vine'
import type { FieldContext } from '@vinejs/vine/types'

vine.convertEmptyStringsToNull = true

const productMustExistAndBeInStock = vine.createRule(async (value, _options, field: FieldContext) => {
  const product = await Product.findBy('id', value)

  if (!product) {
    field.report(
        'O produto não existe',
        'product_must_exist',
        field
    )
    return
  }

  if (product.stock === 0) {
    field.report(
      'O produto está esgotado',
      'product_stock_is_zero',
      field
    )
  }
})

export const storeValidator = vine.compile(
  vine.object({
    productId: vine.number().use(
        productMustExistAndBeInStock()
    ),
    cost: vine.number().min(0)
  })
)

