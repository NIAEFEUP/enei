"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@enei/shadcn/ui/card";
import { InferPageProps } from "@adonisjs/inertia/types";
import OrdersController from "#controllers/orders_controller";
import Page from "~/components/common/page";
interface Order {
  id: number;
  requestId: string;
  userId: number;
  nif: number;
  address: string;
  status: string;
  total: number;
  createdAt: string;
  updatedAt: string;
}

export default function TicketSalePage(
  props: InferPageProps<OrdersController, "show"> & { order: Order },
) {
  const { order } = props;

  return (
    <Page title="Order Details" className="bg-enei-blue">
      <div className="m-5 flex min-h-screen items-center justify-center">
        <Card className="mx-auto w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Order Details</CardTitle>
            <CardDescription>Information about your order</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div>
                <strong>Order ID:</strong> {order.id}
              </div>
              {order.nif !== null && (
                <div>
                  <strong>NIF:</strong> {order.nif}
                </div>
              )}
              {order.address !== null && (
                <div>
                  <strong>Address:</strong> {order.address}
                </div>
              )}

              <div>
                <strong>Status:</strong> {order.status}
              </div>
              <div>
                <strong>Total:</strong> ${order.total.toFixed(2)}
              </div>
              <div>
                <strong>Created:</strong> {new Date(order.createdAt).toLocaleString()}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </Page>
  );
}
