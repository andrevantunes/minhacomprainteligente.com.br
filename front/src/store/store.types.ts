export enum StoreType {
  Accesses = "accesses",
  User = "user",
  Cart = "cart",
}

export interface FetchState {
  fetching: boolean;
  fetched: boolean;
  error: boolean;
}

export const enum ActionName {
  Fetching = "Fetching",
  Fetched = "Fetched",
  Error = "Error",
  Initialize = "Initialize",
  Add = "Add",
  Remove = "Remove",
  Update = "Update",
}
