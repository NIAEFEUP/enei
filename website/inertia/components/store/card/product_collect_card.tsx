import { Card, CardFooter, CardContent } from '~/components/ui/card'

import { cn } from '~/lib/utils'
import { useContext } from 'react'
import { StoreContext } from '~/pages/store/page'

import { canBuyProduct } from '~/lib/enei/store/utils'

import type Product from '#models/product'
import PointsStoreProductCardCollectAction from './product_card_collect_action'

interface StoreProductCardProps {
  product: Product,
  status: string
}

/**
 * This component will include the product component and the button to buy it
*/
function PointsStoreProductCollectCard({
  product,
  status
}: StoreProductCardProps) {
  const { userPoints } = useContext(StoreContext)

  return (
    <Card className={cn("bg-persian-orange flex flex-col", !canBuyProduct(product, userPoints) )}>
      <CardContent className="p-12">
        <img
          src={`/images/products/${product.image ?? "default-product.jpg"}`}
          className={cn("w-full h-full object-cover rounded-md", !canBuyProduct(product, userPoints) && "blur-sm")}
        />
      </CardContent>
      <div className="flex flex-col flex-grow gap-0">
        <div className="bg-enei-blue wave-clip-path h-12"></div>
        <CardFooter className="p-8 bg-enei-blue flex-grow flex flex-col rounded-b-md">
            <PointsStoreProductCardCollectAction 
              product={product}
              status={status}
            />
        </CardFooter>
      </div>
    </Card>
  )
}

export default PointsStoreProductCollectCard