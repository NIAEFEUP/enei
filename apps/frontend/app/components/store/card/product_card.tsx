import { Card, CardFooter, CardHeader, CardContent } from "@enei/shadcn/ui/card";
import PointsStoreProductCardAccquire from "./product_card_accquire";

import { cn } from "@enei/react-utils/cn";
import { useContext, useState } from "react";
import { StoreContext } from "#pages/store/page";

import { canBuyProduct } from "#lib/enei/store/utils";

import type Product from "#models/product";
import ProductCardStock from "./product_card_stock";

interface StoreProductCardProps {
  product: Product;
}

/**
 * This component will include the product component and the button to buy it
 */
function PointsStoreProductCard({ product }: StoreProductCardProps) {
  const [stock, setStock] = useState<number>(product.stock);

  const { userPoints } = useContext(StoreContext);

  return (
    <Card
      className={cn(
        "bg-persian-orange flex flex-col",
        !canBuyProduct(product, userPoints) && "bg-dark-persian-orange",
      )}
    >
      <CardHeader className="flex flex-row items-center justify-end p-4">
        <ProductCardStock stock={stock} />
      </CardHeader>
      <CardContent className="p-12">
        <img
          src={`/images/products/${product.image ?? "default-product.jpg"}`}
          className={cn(
            "h-full w-full rounded-md object-cover",
            !canBuyProduct(product, userPoints) && "blur",
          )}
        />
      </CardContent>
      <div className="flex flex-grow flex-col gap-0">
        <div className="bg-enei-blue wave-clip-path h-12"></div>
        <CardFooter className="bg-enei-blue flex flex-grow flex-col rounded-b-md p-8">
          <PointsStoreProductCardAccquire product={product} setStock={setStock} />
        </CardFooter>
      </div>
    </Card>
  );
}

export default PointsStoreProductCard;
