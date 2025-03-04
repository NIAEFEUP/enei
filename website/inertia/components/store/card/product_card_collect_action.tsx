import React, { useState, useContext } from 'react'

import { Button } from '~/components/ui/button'
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '~/components/ui/dialog'

import { useForm } from '@inertiajs/react'
import { useToast } from '~/hooks/use_toast'

import type Product from '#models/product'
import { ProfileContext } from '~/pages/profile/page'
import { useTuyau } from '~/hooks/use_tuyau'

interface PointsStoreProductCardCollectProps {
    product: Product,
    status: string
}

function PointsStoreProductCardCollectAction({
    product,
    status
}: PointsStoreProductCardCollectProps) {
    const tuyau = useTuyau()
    const { toast } = useToast()
    const { post } = useForm({
        productId: product.id
    })

    const { slug } = useContext(ProfileContext)

    const [open, setOpen] = useState<boolean>(false)

    const collectProduct = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()

        post(tuyau.$url('actions:profile.product.collect', { params: { slug }}), {
            onSuccess: () => {
                toast({
                    title: 'Produto marcado como recolhido',
                    description: `${product.name}`,
                    duration: 5000,
                })

                setOpen(false)
            },
            onError: () => {
                toast({
                    title: 'Não foi possível marcar o produto como recolhido',
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
                {status === "Pending"
                    ? (<DialogTrigger asChild>
                        <Button className="bg-persian-orange p-8">
                            {status === "Pending" ? "Marcar como recolhido" : "Já recolhido"}
                        </Button>
                    </DialogTrigger>
                    )
                    : <span className="text-white font-bold">Já recolhido!</span>
                }
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Confirmação</DialogTitle>
                        <DialogDescription>
                            Marcar {product.name} como recolhido?
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter className="mx-auto">
                        <form onSubmit={collectProduct} method="post">
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

export default PointsStoreProductCardCollectAction
