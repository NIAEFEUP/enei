interface StoreProductCardStockProps {
    stock: number
}

function ProductCardStock({
    stock
}: StoreProductCardStockProps) {
    return (
        <div>
            {stock <= 0
                ? "Sem stock"
                : `Stock: ${stock}`
            }
        </div>
    )
}

export default ProductCardStock