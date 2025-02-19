import type { InferPageProps } from '@adonisjs/inertia/types'

import Page from '~/components/common/page'
import Hero from '~/components/common/hero'
import Container from '~/components/common/containers'
import PointsStoreProductCard from '~/components/store/card/product_card'

import StoreController from '#controllers/store_controller'

import Product from '#models/product'

export default function Store(props: InferPageProps<StoreController, 'index'>) {
  const {
    products,
    user
  } = props

  return (
    <Page title="Loja" className="bg-enei-blue text-enei-beige">
      <Hero className="bg-enei-beige text-enei-blue">
        <Container className="mt-4 flex flex-col gap-y-4">
          <div className="flex flex-col gap-y-4">
            <h1 className="text-center text-3xl font-bold">
              Loja
            </h1>
            <p className="text-center">
              Tens {user?.points ?? 0} pontos
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
      </Hero>
    </Page>
  )
}
