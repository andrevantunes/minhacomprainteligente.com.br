import { ActionName, StoreType } from "./store.types";
import { createGlobalState } from "react-hooks-global-state";
import { devTools } from "./devtools.context";
import combinedStates from "./combined-states";

// @ts-ignore
const { setGlobalState, useGlobalState, getGlobalState, getState } =
  createGlobalState(combinedStates);

export const useStore = useGlobalState;
export const getStore = getGlobalState;

export const setStore = (storeType: StoreType, update: (state: any) => any, name: ActionName) => {
  setGlobalState(storeType as any, update);
  const newState = getState?.();
  const actionName = `${toSnakeCase(storeType, true).toUpperCase()}/${toSnakeCase(name, true)}`;
  if (devTools.current) {
    devTools.current.send(actionName, newState);
  }
  return newState;
};

export const getAllStore = getState;

const toSnakeCase = (str: string, isUppercase = false) => {
  let result = "";
  for (const c of str) {
    if (result.length > 1 && /[A-Z]/.test(c)) result += "_";
    if (isUppercase) result += c.toUpperCase();
    else result += c.toLowerCase();
  }
  return result;
};
