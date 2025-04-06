import User from "#models/user";
import { useAuth } from "~/hooks/use_auth";
import RegistrationConfirmationModal from "./registration_confirmation_modal";
import BillingForm from "~/components/payments/billing_form";
import { useToast } from "~/hooks/use_toast";
import { useTuyau } from "~/hooks/use_tuyau";
import { useForm } from "@inertiajs/react";
import Event from "#models/event";
import { ProductDetails } from "../../../../types/product";

interface PaidRegistrationConfirmationModalProps {
  isOpen: boolean;
  isLoading: boolean;
  onClose: () => void;
  event: Event;
}

interface EventRegistrationForm {
  name: string;
  nif: string;
  address: string;
  mobileNumber: string;
  products: ProductDetails[];
}

export default function PaidRegistrationConfirmationModal({
  isOpen,
  isLoading,
  onClose,
  event,
}: PaidRegistrationConfirmationModalProps) {
  const auth = useAuth({ only: ["authenticated"] });

  const { toast } = useToast();

  const tuyau = useTuyau();

  const { data, setData, errors, post } = useForm<EventRegistrationForm>({
    name: "",
    nif: "",
    address: "",
    mobileNumber: "",
    products: [],
  });

  const handleSubmit = (
    user: User,
    itemId: number,
    enableBillingInfo: boolean,
    billingInfo,
    number: string,
  ) => {
    data.name = "";
    data.nif = billingInfo.nif;
    data.address = billingInfo.address;
    data.mobileNumber = number;
    data.products = event.productGroup.products.map((product) => ({
      productId: product.id,
      quantity: product.stock,
    }));

    post(tuyau.$url("actions:events.register", { params: { id: itemId } }), {
      onSuccess: () => {
        toast({
          title: "Pagamento realizado com sucesso",
          description: "Obrigado por se inscrever!",
          duration: 5000,
        });
      },
      onError: () => {
        toast({
          title: "Ocorreu um erro ao realizar o pagamento",
          description: "Por favor, tente novamente.",
          duration: 5000,
        });
      },
    });
  };

  return (
    <RegistrationConfirmationModal
      isOpen={isOpen}
      isLoading={isLoading}
      onClose={onClose}
      onSubmit={() => {}}
      showConfirmation={false}
    >
      <BillingForm
        paymentHandler={handleSubmit}
        user={auth.user as User}
        itemId={event.id}
        showTitle={false}
      />
    </RegistrationConfirmationModal>
  );
}
