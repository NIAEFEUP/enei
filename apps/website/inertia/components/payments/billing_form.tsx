import { useState, useEffect, Dispatch } from "react";
import PhoneNumberModal from "./phone_modal";
import OrderConfirmationModal from "./order_confirmation_modal";
import BillingInformationForm from "./billing_information_form";
import { Separator } from "~/components/ui/separator";
import { Button } from "~/components/ui/button";
import { router } from "@inertiajs/react";
import { useToast } from "~/hooks/use_toast";
import User from "#models/user";

interface BillingFormProps {
  paymentHandler: (
    user: User,
    itemId: number,
    enableBillingInfo: boolean,
    billingInfo,
    number: string,
  ) => void;
  user: User;
  itemId: number;
  showTitle?: boolean;
}

export default function BillingForm({
  paymentHandler,
  user,
  itemId,
  showTitle = true,
}: BillingFormProps) {
  const [enableBillingInfo, setEnableBillingInfo] = useState(false);
  const [phoneModalOpen, setPhoneModalOpen] = useState(false);
  const [orderConfirmationModalOpen, setOrderConfirmationModalOpen] = useState(false);
  const [phoneModalIsLoading, setPhoneModalIsLoading] = useState(false);
  const [billingInfo, setBillingInfo] = useState({
    name: "",
    vat: "",
    address: "",
  });
  // const item = props.ticket;

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
      paymentHandler(user, itemId, enableBillingInfo, billingInfo, number);

      // setPhoneModalIsLoading(false);
      // setPhoneModalOpen(false);
      // setOrderConfirmationModalOpen(true);
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
    <>
      <Separator />

      <div className="flex flex-col gap-y-4">
        <BillingInformationForm
          enableBillingInfo={enableBillingInfo}
          setEnableBillingInfo={setEnableBillingInfo}
          billingInfo={billingInfo}
          onBillingInfoChange={handleBillingInfoChange}
          showTitle={showTitle}
        />

        <Button onClick={handlePaymentClick} className="w-full">
          Pagar com
          <img src="/images/mbway_white.svg" alt="MB Way" className="h-6 w-auto" />
        </Button>
      </div>

      <PhoneNumberModal
        isOpen={phoneModalOpen}
        isLoading={phoneModalIsLoading}
        onClose={() => setPhoneModalOpen(false)}
        onSubmit={handleModalSubmit}
      />

      <OrderConfirmationModal isOpen={orderConfirmationModalOpen} onClose={() => {}} />
    </>
  );
}
