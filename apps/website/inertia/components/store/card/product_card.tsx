import { Card, CardFooter, CardContent } from "@enei/shadcn/ui/card";
import PointsStoreProductCardAccquire from "./product_card_accquire";

import { cn } from "@enei/shadcn/cn";
import { useContext } from "react";

import { canBuyProduct } from "~/lib/enei/store/utils";

import type Product from "#models/product";
import { StoreContext } from "~/pages/store/context";

interface StoreProductCardProps {
  product: Product;
}

/**
 * This component will include the product component and the button to buy it
 */
function PointsStoreProductCard({ product }: StoreProductCardProps) {
  const { userPoints } = useContext(StoreContext);

  return (
    <Card className={cn("bg-persian-orange flex flex-col", !canBuyProduct(product, userPoints))}>
      <CardContent className="h-72 p-12">
        <img
          src={`/images/products/${product.image ?? "default-product.jpg"}`}
          className={cn(
            "h-full w-full rounded-md object-contain",
            //!canBuyProduct(product, userPoints) && 'blur-xs'
          )}
        />
      </CardContent>
      <div className="flex grow flex-col gap-0">
        <div className="bg-enei-blue wave-clip-path -mb-1 h-12"></div>
        <CardFooter className="bg-enei-blue flex grow flex-col rounded-b-md p-8">
          <PointsStoreProductCardAccquire product={product} />
        </CardFooter>
      </div>
    </Card>
  );
}

export default PointsStoreProductCard;
