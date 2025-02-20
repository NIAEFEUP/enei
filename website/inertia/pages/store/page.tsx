import type { InferPageProps } from '@adonisjs/inertia/types'

import Page from '~/components/common/page'
import Hero from '~/components/common/hero'
import Container from '~/components/common/containers'
import PointsStoreProductCard from '~/components/store/card/product_card'

import { useState, createContext } from 'react'

import StoreController from '#controllers/store_controller'

type PointsStoreContextType = {
  userPoints: number,
  setUserPoints: React.Dispatch<React.SetStateAction<number>>
}

export const StoreContext = createContext<PointsStoreContextType>(null)

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
      <Page title="Loja" className="bg-enei-blue text-enei-beige">
        <div className="bg-enei-beige text-enei-blue">
          <Container className="mt-4 flex flex-col gap-y-8">
            <div className="flex flex-col gap-y-4">
              <h1 className="text-center text-3xl font-bold">
                Loja
              </h1>
              <p className="text-center">
                Tens {userPoints} pontos
              </p>
            </div>
            <Container className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {products?.map((product) => (
                <PointsStoreProductCard
                  product={product}
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
