import { Card, CardFooter, CardHeader, CardContent, CardTitle } from '~/components/ui/card'
import PointsStoreProductCardAccquire from './product_card_accquire'

import { cn } from '~/lib/utils'
import { useContext } from 'react'
import { StoreContext } from '~/pages/store/page'

import Product from '#models/product'

interface StoreProductCardProps {
  product: typeof Product
}

/**
 * This component will include the product component and the button to buy it
*/
function PointsStoreProductCard({
  product
}: StoreProductCardProps) {
  const { userPoints } = useContext(StoreContext)

  return (
    <Card className={cn("", (userPoints < product.price || product.stock === 0) && "opacity-50")}>
      <CardHeader>
        <CardTitle>{product.name}</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Aqui é que vai ser renderizado aquele componente dinâmico */}
      </CardContent>
      <CardFooter>
        <PointsStoreProductCardAccquire
          product={product}
        />
      </CardFooter>
    </Card>
  )
}

export default PointsStoreProductCard
