import { Button } from '~/components/ui/button'

import Product from '#models/product'

interface PointsStoreProductCardAccquireProps {
  product: typeof Product
}

function PointsStoreProductCardAccquire({
  product
}: PointsStoreProductCardAccquireProps) {
  return (
    <div className="flex flex-row justify-between w-full">
      <p>{product.price} {product.currency}</p>
      <Button>
        {product.price === 0 ? "Obter" : "Comprar"}
      </Button>
    </div>
  )
}

export default PointsStoreProductCardAccquire
