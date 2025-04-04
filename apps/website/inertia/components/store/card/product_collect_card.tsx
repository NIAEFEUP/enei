import { Card, CardFooter, CardContent } from "~/components/ui/card";

import { cn } from "~/lib/utils";
import { useContext } from "react";

import { canBuyProduct } from "~/lib/enei/store/utils";

import type Product from "#models/product";
import PointsStoreProductCardCollectAction from "./product_card_collection_card";
import { StoreContext } from "~/pages/store/context";

interface StoreProductCardProps {
  product: Product;
  status: string;
}

/**
 * This component will include the product component and the button to buy it
 */
function PointsStoreProductCollectCard({ product, status }: StoreProductCardProps) {
  const { userPoints } = useContext(StoreContext);

  return (
    <Card className={cn("bg-persian-orange flex flex-col", !canBuyProduct(product, userPoints))}>
      <CardContent className="p-12">
        <img
          src={`/images/products/${product.image ?? "default-product.jpg"}`}
          className={cn(
            "h-full w-full rounded-md object-cover",
            !canBuyProduct(product, userPoints) && "blur-sm",
          )}
        />
      </CardContent>
      <div className="flex flex-grow flex-col gap-0">
        <div className="bg-enei-blue wave-clip-path h-12"></div>
        <CardFooter className="bg-enei-blue flex flex-grow flex-col rounded-b-md p-8">
          <PointsStoreProductCardCollectAction product={product} status={status} />
        </CardFooter>
      </div>
    </Card>
  );
}

export default PointsStoreProductCollectCard;
