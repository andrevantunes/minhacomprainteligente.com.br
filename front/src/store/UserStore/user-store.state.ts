import type { UserProfile, UserState } from "@/types";

import { StoreType } from "@/store";
import { initialFetchState } from "../store.helper";

interface UserStore {
  [StoreType.User]: UserState;
}

export const userInitialState: UserProfile = {
  birthDate: "",
  email: "",
  enemSubscriptionId: null,
  guest: true,
  image: null,
  name: "",
  firstLogin: false,
  phone: null,
  roles: [],
  settings: {},
  token: "",
  uid: "",
  crmEmail: null,
  persona: {
    name: "",
    slug: "",
    brandImage: null,
  },
};

export const defaultState: UserStore = {
  user: {
    ...userInitialState,
    ...initialFetchState,
  },
};
