import { setStore } from "@/store/store.global";
import { ActionName, StoreType } from "@/store/store.types";
import type { CartState } from "@/types";

export const update = (accesses: Partial<CartState>, actionName: ActionName) =>
  setStore(StoreType.Cart, (state) => ({ ...state, ...accesses }), actionName);
