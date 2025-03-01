import type { InferPageProps } from '@adonisjs/inertia/types'

import Page from '~/components/common/page'
import Container from '~/components/common/containers'
import PointsStoreProductCard from '~/components/store/card/product_card'

import type Product from '#models/product'

import { useState, createContext } from 'react'

import StoreController from '#controllers/store_controller'

type PointsStoreContextType = {
  userPoints: number,
  setUserPoints: React.Dispatch<React.SetStateAction<number>>
}

export const StoreContext = createContext<PointsStoreContextType>({
  userPoints: 0,
  setUserPoints: () => {}
})

export default function Store(props: InferPageProps<StoreController, 'index'>) {
  const {
    products,
    user
  } = props

  const [userPoints, setUserPoints] = useState<number>(user?.points ?? 0)

  return (
    <StoreContext.Provider
      value={
        {
          userPoints,
          setUserPoints
        }
      }
    >
      <Page title="Loja" className="bg-enei-blue text-enei-beige" variant="beige">
        <div className="bg-enei-beige text-enei-blue min-h-dvh">
          <Container className="mt-4 flex flex-col gap-y-24 justify-center">
            <div className="flex flex-col gap-y-2">
              <h1 className="text-center text-3xl font-bold">
                Loja
              </h1>
              <p className="text-center text-persian-orange text-2xl font-bold">
                {userPoints} pontos
              </p>
            </div>
            <Container className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 justify-center">
              {products.length === 0
                && <p className="text-center mx-auto w-full text-2xl">Não há produtos disponíveis</p>
              }

              {products?.map((product) => (
                <PointsStoreProductCard
                  product={product as Product}
                  key={`points-store-product-${product.id}`}
                />
              ))}
            </Container>
          </Container>
        </div>
      </Page>
    </StoreContext.Provider>
  )
}
