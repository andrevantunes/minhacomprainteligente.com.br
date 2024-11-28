import type { User, UserProfile, UserState } from "@/types";

import Dictionary from "@/configs/dictionary";
import * as Login from "@/helpers/login.helper";
import { notifyError, notifySuccess } from "@/helpers/notify.helper";
import { logout } from "@/helpers/user.helper";
import {
  getUserProfile,
  updateProfile as updateUserProfile,
  validateUserToken,
} from "@/requests/user.request";
import { getStore, setStore } from "@/store/store.global";
import { errorFetchState, fetchedState, fetchingState } from "@/store/store.helper";
import { ActionName, StoreType } from "@/store/store.types";
import { SocialNames } from "@/types";
import Router from "next/router";
import { get as getCookies, set as setCookie } from "@/helpers/cookie.helper";

import * as AccessStore from "@/store/AccessesStore/accesses-store.action";
import { userInitialState } from "./user-store.state";

const { common, socialLogin, signin, signup, signout } = Dictionary;

export const update = (user: Partial<UserState>, actionName: ActionName) =>
  setStore(StoreType.User, (state) => ({ ...state, ...user }), actionName);

export const updatePlatformSlug = (platformSlug: string, actionName: ActionName) => {
  const cookies = getCookies(null) || {};
  const cookie = JSON.parse(cookies["user-credentials"] || "");
  cookie.platformSlug = platformSlug;
  if (!platformSlug || platformSlug === "enem-e-vestibulares") cookie.platformSlug = "";

  cookie.platformSlug = platformSlug;
  setStore(
    StoreType.User,
    (state) => ({ ...state, platformSlug: cookie.platformSlug }),
    actionName
  );
  setCookie(null, "user-credentials", JSON.stringify(cookie), {
    domain: ".mesalva.com",
    path: "/",
  });
};

export const getUserStore = () => {
  const { fetching, error, fetched, ...user } = getStore(StoreType.User);
  return user;
};

export const updateProfile = async (user: Partial<UserProfile>) => {
  update(fetchingState, ActionName.Fetching);

  try {
    await validate();
    await updateUserProfile(user);
    await updateUserFullStore();
  } catch {
    update(errorFetchState, ActionName.Error);
    throw new Error(common.notAuthenticated);
  }
};

export const loginByEmail = async (
  email: string,
  password: string,
  platformSlug = ""
): Promise<void> => {
  const event = { loginBy: "email" };
  return handleLogin({ ...signin, event }, () => null);
};

export const signUpByEmail = async (
  name: string,
  whatsapp: string,
  email: string,
  password: string,
  crmAllowed: boolean,
  platformSlug = ""
): Promise<void> => {
  const event = { loginBy: "signup" };
  return handleLogin({ ...signup, event }, () =>
    null
  );
};

export const loginBySocial = async (name: SocialNames, platformSlug = ""): Promise<void> => {
  const event = { loginBy: name.toLowerCase() };
  return handleLogin({ ...socialLogin, event }, async () => {
    if (name === SocialNames.Google) return null;
    if (name === SocialNames.Facebook) return null;
    throw new Error("Not integrated social method to login");
  });
};

export const validate = async () => {
  const { guest, uid } = getStore(StoreType.User);
  if (guest || typeof uid !== "string") {
    update(errorFetchState, ActionName.Error);
    AccessStore.update(errorFetchState, ActionName.Error);
    return;
  }
  update(fetchingState, ActionName.Fetching);
  try {
    await validateUserToken();
    await updateUserFullStore();
  } catch {
    expireUser();
  }
};

interface LoginDictionary {
  submit: { success: string; error: string };
  event: { loginBy: string };
}

type LoginMethod = () => Promise<User>;

const handleLogout = () => {
  logout();
  update(userInitialState, ActionName.Remove);
};

const handleLogin = async (dictionary: LoginDictionary, login: LoginMethod) => {
  update(fetchingState, ActionName.Fetching);
  const { submit } = dictionary;
  try {
    await login();
    await updateUserFullStore();
    notifySuccess(submit.success);
  } catch (e: any) {
    const message = e?.message ?? submit.error;
    notifyError(message);
    handleLogout();
    update(errorFetchState, ActionName.Error);
  }
};

const updateUserFullStore = async () => {
  update(fetchingState, ActionName.Fetching);
  try {
    const { user, accesses } = await getUserProfile();
    update(user, ActionName.Add);
    AccessStore.addAccesses(accesses);
    update(fetchedState, ActionName.Fetched);
  } catch (error) {
    update(errorFetchState, ActionName.Error);
    AccessStore.update(errorFetchState, ActionName.Error);
    throw new Error();
  }
};

const expireUser = async () => {
  notifyError(`${signout.expired}. ${signout.redirect}`);
  setTimeout(() => {
    handleLogout();
    update(errorFetchState, ActionName.Error);
    Router.push(Login.getURLLogin());
  }, 4000);
};
