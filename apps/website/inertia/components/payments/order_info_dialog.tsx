import { useState } from "react";
import Product from "#models/product";
import { Dialog, DialogTrigger, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "../ui/dialog";
import { Button } from "../ui/button";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExpand } from "@fortawesome/free-solid-svg-icons";

export interface Order {
  id: number;
  requestId: string;
  userId: number;
  nif: number;
  address: string;
  status: string;
  total: number;
  createdAt: string;
  updatedAt: string;
  products: Product[];
}


export default function OrderInfoDialog({ order }: { order: Order }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          title="View"
        >
          <FontAwesomeIcon icon={faExpand} />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-2xl bg-enei-beige text-enei-blue">
        <DialogHeader>
          <DialogTitle>Pedido #{order.id}</DialogTitle>
          <DialogDescription>
            <div className="py-4 space-y-4">
              <div className="grid grid-cols-2 gap-2 text-enei-blue">
                <div className="text-sm font-medium">Código do Request:</div>
                <div className="text-sm">{order.requestId}</div>

                <div className="text-sm font-medium">Estado:</div>
                <div className="text-sm">{order.status}</div>

                <div className="text-sm font-medium">NIF:</div>
                <div className="text-sm">{order.nif}</div>

                <div className="text-sm font-medium">Morada:</div>
                <div className="text-sm">{order.address}</div>

                <div className="text-sm font-medium">Total:</div>
                <div className="text-sm">
                  {order.total ? order.total.toFixed(2) : "0.00"}€
                </div>

                <div className="text-sm font-medium">Data:</div>
                <div className="text-sm">
                  {new Date(order.createdAt).toLocaleString()}
                </div>
              </div>

              <div className="mt-6 text-enei-blue">
                <h3 className="text-base font-semibold mb-2">Produtos</h3>
                <div className="border-2 rounded-md divide-y border-enei-blue">
                  {order.products.map((product) => (
                    <div key={product.id} className="p-3 flex justify-between">
                      <div>
                        <p className="font-medium">{product.name}</p>
                      </div>
                      <div className="text-right">
                        <p>{product.price ? product.price.toFixed(2) : "0.00"}€</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
}
