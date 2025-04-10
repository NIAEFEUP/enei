import InvoiceInfo from "#models/invoice_info";
import { owningRelationFeature, targetRelationFeature } from "../relations.js";
import { createResource } from "../resource.js";

const InvoiceInfoResource = createResource({
  model: InvoiceInfo,
  features: [
    targetRelationFeature(),
    owningRelationFeature({
      payments: {
        type: "one-to-many",
        target: {
          resourceId: "payments",
          joinKey: "invoiceInfoId",
        },
      },
    }),
  ],
});

export default InvoiceInfoResource;
