import OrderProduct from "#models/order_product"
import PointsStoreProductCollectCard from "../store/card/product_collect_card"

interface StoreReservedProductsProps {
    products: Array<OrderProduct>,
}

export default function StoreReservedProducts({
    products
}: StoreReservedProductsProps) {
    return (
        <>
            {products?.map(({ product, order }) => (
                <PointsStoreProductCollectCard
                    key={product.id}
                    product={product}
                    status={order.status}
                />
            ))}
        </>
    )
}