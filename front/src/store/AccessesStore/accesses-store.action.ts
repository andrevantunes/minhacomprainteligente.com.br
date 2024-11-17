import { parseAccessesFull } from "@/helpers/accesses.helper";
import { getStore, setStore } from "@/store/store.global";
import { ActionName, StoreType } from "@/store/store.types";
import type { Accesses, AccessesFull, AccessesState } from "@/types";
import { fetchedState } from "../store.helper";

export const update = (accesses: Partial<AccessesState>, actionName: ActionName) =>
  setStore(StoreType.Accesses, (state) => ({ ...state, ...accesses }), actionName);

export const getFullAccesses = (): AccessesFull => {
  const { fetching, error, ...accesses } = getStore(StoreType.Accesses);
  return accesses;
};

export const addAccesses = async (accesses: Accesses) => {
  const user = getStore(StoreType.User);
  const accessesFull = parseAccessesFull(user, accesses);
  update({ ...accessesFull, ...fetchedState }, ActionName.Add);
};

export const decreaseEssayCredits = () => {
  const { essayCredits, essayUnlimited } = getStore(StoreType.Accesses);
  if (essayUnlimited || essayCredits <= 0) return;
  update({ essayCredits: essayCredits - 1 }, ActionName.Update);
};

export const increaseEssayCredits = () => {
  const { essayCredits, essayUnlimited } = getStore(StoreType.Accesses);
  if (essayUnlimited) return;
  update({ essayCredits: essayCredits + 1 }, ActionName.Update);
};
