import { initialAccesses } from "@/helpers/accesses.helper";
import { StoreType } from "@/store";
import { initialFetchState } from "@/store/store.helper";
import { AccessesState } from "@/types";

interface AccessesStore {
  [StoreType.Accesses]: AccessesState;
}

export const defaultState: AccessesStore = {
  accesses: {
    ...initialAccesses,
    ...initialFetchState,
  },
};
