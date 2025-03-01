import React, { useState, useContext } from 'react'

import { StoreContext } from '~/pages/store/page'
import { Button } from '~/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog'

import { useForm } from '@inertiajs/react'
import { useToast } from '~/hooks/use_toast'

import { canBuyProduct } from '~/lib/enei/store/utils'

import type Product from '#models/product'

interface ProductAcquireDisplayTextProps {
  product: Product,
  userPoints: number
}

function AcquireDisplayText({
  product,
  userPoints
}: ProductAcquireDisplayTextProps) {
  const displayText = product.price === 0 ? "Obter" : "Comprar"

  return (
    <>
      <div className="flex flex-col">
        <span className="text-lg font-bold">
          {product.price <= userPoints
            ? `${displayText}`
            : "Sem pontos"
          }
        </span>
        <span>{product.price} pontos</span>
      </div>
    </>
  )
}

interface PointsStoreProductCardAccquireProps {
  product: Product,
  setStock: React.Dispatch<React.SetStateAction<number>>
}

function PointsStoreProductCardAccquire({
  product,
  setStock
}: PointsStoreProductCardAccquireProps) {
  const [open, setOpen] = useState<boolean>(false)

  const { toast } = useToast()
  const { post } = useForm({
    cost: product.price
  })

  const { userPoints, setUserPoints } = useContext(StoreContext)

  const acquireProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    post(`/store/products/${product.id}/buy/`, {
      onSuccess: () => {
        toast({
          title: 'Produto adquirido',
          description: `${product.name}`,
          duration: 5000,
        })

        setUserPoints(prev => prev - product.price)
        setStock(prev => prev - 1)
        setOpen(false)
      },
      onError: () => {
        toast({
          title: 'Não foi possível adquirir o produto',
          duration: 5000,
        })

        setOpen(false)
      }
    })
  }

  return (<>
    <div className="flex flex-row justify-between items-center w-full">
      <p className="text-white font-bold">
        {product.name}
      </p>
      <Dialog open={open} onOpenChange={setOpen}>
        {product.stock > 0
          ? (<DialogTrigger disabled={!canBuyProduct(product, userPoints)} asChild>
          <Button className="bg-persian-orange p-8">
            <AcquireDisplayText
              product={product}
              userPoints={userPoints}
            />
          </Button>
        </DialogTrigger>
        )
        : <span className="text-white font-bold">Esgotado</span>
        }
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirmação</DialogTitle>
            <DialogDescription>
              Adquirir {product.name} por {product.price} {product.currency}?
            </DialogDescription>
          </DialogHeader>
          <DialogFooter className="mx-auto">
            <form onSubmit={acquireProduct} method="post">
              <Button type="submit">
                Confirmar
              </Button>
            </form>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
    </>
  )
}

export default PointsStoreProductCardAccquire
