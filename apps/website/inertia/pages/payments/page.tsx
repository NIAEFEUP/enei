"use client";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { InferPageProps } from "@adonisjs/inertia/types";
import TicketsController from "#controllers/tickets_controller";
import Page from "~/components/common/page";
import axios from "axios";
import BillingForm from "~/components/payments/billing_form";
import User from "#models/user";

interface Ticket {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

export default function TicketSalePage(props: InferPageProps<TicketsController, "showPayment">) {
  const { user, ticket } = props;

  const paymentHandler = async (
    user: User,
    itemId: number,
    enableBillingInfo: boolean,
    billingInfo,
    number: string,
  ) => {
    await axios.post("/payment/mbway", {
      userId: user.id,
      products: [{ productId: itemId, quantity: 1 }],
      name: enableBillingInfo ? billingInfo.name : null,
      nif: enableBillingInfo ? billingInfo.vat : null,
      address: enableBillingInfo ? billingInfo.address : null,
      mobileNumber: number,
    });
  };

  return (
    <Page title="Compra de Bilhete" className="bg-enei-blue">
      <div className="mt-10 flex justify-center">
        <Card className="mx-auto w-full max-w-2xl">
          <CardHeader>
            <CardTitle>Completa a tua compra</CardTitle>
            <CardDescription>Revê o teu bilhete e procede para o pagamento</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <BillingForm paymentHandler={paymentHandler} user={user as User} itemId={ticket?.id} />
          </CardContent>
        </Card>
      </div>
    </Page>
  );
}
