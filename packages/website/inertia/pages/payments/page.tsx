"use client";
import { router } from "@inertiajs/react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/components/ui/card";
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";
import { useState, useEffect } from "react";
import { InferPageProps } from "@adonisjs/inertia/types";
import TicketsController from "#controllers/tickets_controller";
import PhoneNumberModal from "~/components/payments/phone_modal";
import OrderConfirmationModal from "~/components/payments/order_confirmation_modal";
import PurchaseSummary from "~/components/payments/purchase_summary";
import BillingInformationForm from "~/components/payments/billing_information_form";
import Page from "~/components/common/page";
import axios from "axios";
import { useToast } from "~/hooks/use_toast";

interface Ticket {
  id: number;
  name: string;
  description: string;
  price: number;
  image: string;
}

interface User {
  id: number;
}

export default function TicketSalePage(
  props: InferPageProps<TicketsController, "showPayment"> & { ticket: Ticket; user: User },
) {
  const [enableBillingInfo, setEnableBillingInfo] = useState(false);
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);
  const [orderConfirmationModalOpen, setOrderConfirmationModalOpen] = useState(false);
  const [phoneModalIsLoading, setPhoneModalIsLoading] = useState(false);
  const [billingInfo, setBillingInfo] = useState({
    name: "",
    vat: "",
    address: "",
  });
  const item = props.ticket;
  const { toast } = useToast();

  // Clear billing info when the component mounts (to prevent stale data)
  useEffect(() => {
    setBillingInfo({
      name: "",
      vat: "",
      address: "",
    });
  }, []);

  // Handles the payment button click. If the payment method is MB Way, it opens the phone modal, otherwise it processes the payment
  const handlePaymentClick = () => {
    setPhoneModalOpen(true);
  };

  // Closes the modal (if open) and processes the payment
  const handleModalSubmit = async (number: string) => {
    setPhoneModalIsLoading(true);

    if (phoneModalOpen && !number) {
      return;
    }
    try {
      await axios.post("/payment/mbway", {
        userId: props.user.id,
        products: [{ productId: item.id, quantity: 1 }],
        name: enableBillingInfo ? billingInfo.name : null,
        nif: enableBillingInfo ? billingInfo.vat : null,
        address: enableBillingInfo ? billingInfo.address : null,
        mobileNumber: number,
      });
      setPhoneModalIsLoading(false);
      setPhoneModalOpen(false);
      setOrderConfirmationModalOpen(true);
    } catch (error) {
      setPhoneModalIsLoading(false);
      setPhoneModalOpen(false);
      toast({
        title: "Erro a processar o pagamento",
        description:
          error.response?.data?.message
          || "Ocorreu um erro ao processar o pagamento. Por favor, tenta novamente.",
        duration: 5000,
      });
    }
  };

  // Updates the billing information when the user types
  const handleBillingInfoChange = (key: string, value: string) => {
    setBillingInfo({
      ...billingInfo,
      [key]: value,
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
            {item ? <PurchaseSummary item={item} /> : <p>Loading ticket details...</p>}
            <Separator />

            <BillingInformationForm
              enableBillingInfo={enableBillingInfo}
              setEnableBillingInfo={setEnableBillingInfo}
              billingInfo={billingInfo}
              onBillingInfoChange={handleBillingInfoChange}
            />

            <Button onClick={handlePaymentClick} className="w-full">
              Pagar com
              <img src="/images/mbway_black.svg" alt="MB Way" className="h-6 w-auto" />
            </Button>

            <PhoneNumberModal
              isOpen={phoneModalOpen}
              isLoading={phoneModalIsLoading}
              onClose={() => setPhoneModalOpen(false)}
              onSubmit={handleModalSubmit}
            />

            <OrderConfirmationModal
              isOpen={orderConfirmationModalOpen}
              onClose={() => {
                router.visit("/");
              }}
            />
          </CardContent>
        </Card>
      </div>
    </Page>
  );
}
