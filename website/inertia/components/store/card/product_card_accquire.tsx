import { useState, useContext } from 'react'

import { StoreContext } from '~/pages/store/page'
import { Button } from '~/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog'

import { useForm } from '@inertiajs/react'
import { useToast } from '~/hooks/use_toast'

import Product from '#models/product'

function AcquireDisplayText({ productPrice, userPoints}) {
  const displayText = productPrice === 0 ? "Obter" : "Comprar"

  return (
    <>
      {userPoints < productPrice 
        ? "Sem pontos suficientes"
        : displayText
      }
    </>
  )
}

interface PointsStoreProductCardAccquireProps {
  product: Product
}

function PointsStoreProductCardAccquire({
  product
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

  return (
    <div className="flex flex-row justify-between w-full">
      <p>{product.price} {product.currency}</p>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger disabled={userPoints < product.price}>
          <AcquireDisplayText 
            productPrice={product.price} 
            userPoints={userPoints} 
          />
        </DialogTrigger>
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
  )
}

export default PointsStoreProductCardAccquire
