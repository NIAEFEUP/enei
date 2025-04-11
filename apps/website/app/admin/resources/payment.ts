import Payment from "#models/payment";
import { targetRelationFeature } from "../relations.js";
import { createResource } from "../resource.js";

const PaymentResource = createResource({
  model: Payment,
  options: {
    properties: {
      invoiceInfoId: {
        reference: "invoice_infos",
      },
      orderId: {
        reference: "orders",
      },
    },
  },
  features: [targetRelationFeature()],
});

export default PaymentResource;
