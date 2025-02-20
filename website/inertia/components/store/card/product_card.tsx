import { Card, CardFooter, CardHeader, CardContent, CardTitle } from '~/components/ui/card'
import PointsStoreProductCardAccquire from './product_card_accquire'

import { cn } from '~/lib/utils'
import { useContext, useState } from 'react'
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
  const [stock, setStock] = useState<number>(product.stock)

  const { userPoints } = useContext(StoreContext)

  return (
    <Card className={cn("", (userPoints < product.price || product.stock === 0) && "opacity-50")}>
      <CardHeader className="flex flex-row justify-between items-center">
        <CardTitle>{product.name}</CardTitle>
        <p>Stock: {stock}</p>
      </CardHeader>
      <CardContent>
        {/* Aqui é que vai ser renderizado aquele componente dinâmico */}
      </CardContent>
      <CardFooter>
        <PointsStoreProductCardAccquire
          product={product}
          setStock={setStock}
        />
      </CardFooter>
    </Card>
  )
}

export default PointsStoreProductCard
