import { Card, CardFooter, CardContent } from '~/components/ui/card'
import PointsStoreProductCardAccquire from './product_card_accquire'

import { cn } from '~/lib/utils'
import { useContext, useState } from 'react'
import { StoreContext } from '~/pages/store/page'

import { canBuyProduct } from '~/lib/enei/store/utils'

import type Product from '#models/product'

interface StoreProductCardProps {
  product: Product
}

/**
 * This component will include the product component and the button to buy it
 */
function PointsStoreProductCard({ product }: StoreProductCardProps) {
  const { userPoints } = useContext(StoreContext)

  return (
    <Card
      className={cn(
        'bg-persian-orange flex flex-col',
        !canBuyProduct(product, userPoints)
      )}
    >
      <CardContent className="p-12 h-72">
        <img
          src={`/images/products/${product.image ?? 'default-product.jpg'}`}
          className={cn(
            'w-full h-full object-contain rounded-md',
            !canBuyProduct(product, userPoints) && 'blur-sm'
          )}
        />
      </CardContent>
      <div className="flex flex-col flex-grow gap-0">
        <div className="bg-enei-blue wave-clip-path h-12"></div>
        <CardFooter className="p-8 bg-enei-blue flex-grow flex flex-col rounded-b-md">
          <PointsStoreProductCardAccquire product={product} />
        </CardFooter>
      </div>
    </Card>
  )
}

export default PointsStoreProductCard
