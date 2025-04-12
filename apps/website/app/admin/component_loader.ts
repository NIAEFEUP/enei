import { ComponentLoader } from "adminjs";

const componentLoader = new ComponentLoader();

const Components = {
  Attachments: componentLoader.add("Attachments", "components/attachment/index"),
  // CreateMbWayPayment: componentLoader.add("CreateMbWayPayment", "components/payment/create-mbway-payment"),
};

export { componentLoader, Components };
