import type { ProductDetails } from "./product.js";

export type MBWayOrder = {
  products: Array<ProductDetails>;
  name: string;
  nif: string;
  address: string;
  mobileNumber: string;
};
