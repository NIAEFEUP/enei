import React, { useState, useContext } from "react";

import { StoreContext } from "~/pages/store/context";
import { Button } from "~/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "~/components/ui/dialog";

import { useForm } from "@inertiajs/react";
import { useToast } from "~/hooks/use_toast";

import { canBuyProduct } from "~/lib/enei/store/utils";

import type Product from "#models/product";

interface ProductAcquireDisplayTextProps {
  product: Product;
  userPoints: number;
}

function AcquireDisplayText({ product, userPoints }: ProductAcquireDisplayTextProps) {
  const displayText = product.points === 0 ? "Obter" : "Comprar";

  return (
    <>
      <div className="flex flex-col">
        <span className="text-md font-bold">
          {product.points <= userPoints ? `${displayText}` : "Sem bytes"}
        </span>
      </div>
    </>
  );
}

interface PointsStoreProductCardAccquireProps {
  product: Product;
}

function PointsStoreProductCardAccquire({ product }: PointsStoreProductCardAccquireProps) {
  const [open, setOpen] = useState<boolean>(false);

  const { toast } = useToast();
  const { post } = useForm({
    cost: product.points,
  });

  const { userPoints, setUserPoints } = useContext(StoreContext);

  const acquireProduct = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    post(`/store/products/${product.id}/buy/`, {
      onSuccess: () => {
        toast({
          title: "Produto adquirido",
          description: `${product.name}`,
          duration: 5000,
        });

        setUserPoints((prev) => prev - product.points);
        setOpen(false);
      },
      onError: () => {
        toast({
          title: "Não foi possível adquirir o produto",
          duration: 5000,
        });

        setOpen(false);
      },
    });
  };

  return (
    <>
      <div className="flex w-full flex-col justify-between gap-x-8">
        <p className="font-bold text-white">{product.name}</p>
        <p className="text-white">
          {product.points} bytes • {product.stock} {product.stock === 1 ? "unidade" : "unidades"}
        </p>
        <Dialog open={open} onOpenChange={setOpen}>
          {product.stock > 0 ? (
            <DialogTrigger disabled={!canBuyProduct(product, userPoints)} asChild>
              <Button className="bg-persian-orange mt-4 p-8">
                <AcquireDisplayText product={product} userPoints={userPoints} />
              </Button>
            </DialogTrigger>
          ) : (
            <span className="font-bold text-white">Esgotado</span>
          )}
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Confirmação</DialogTitle>
              <DialogDescription>
                Adquirir {product.name} por {product.points} bytes?
              </DialogDescription>
            </DialogHeader>
            <DialogFooter className="mx-auto">
              <form onSubmit={acquireProduct} method="post">
                <Button type="submit">Confirmar</Button>
              </form>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </>
  );
}

export default PointsStoreProductCardAccquire;
