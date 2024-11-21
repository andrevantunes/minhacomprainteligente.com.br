import { StoreType } from "@/store";
import { CartState } from "@/types";

export interface CartStore {
  [StoreType.Cart]: CartState;
}

export const defaultState: CartStore = {
  cart: {
    products: [],
    properties: [],
  },
};
