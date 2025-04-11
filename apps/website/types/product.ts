import type { UserTypes } from "./user.js";

export type ProductRestrictions = {
  groups: Array<UserTypes>;
};

export type ProductDetails = {
  productId: number;
  quantity: number;
};
