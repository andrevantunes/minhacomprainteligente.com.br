import type { User, UserProfile, UserState } from "@/types";

import Dictionary from "@/configs/dictionary";
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
import { userInitialState } from "./user-store.state";

const { common, socialLogin, signin, signup } = Dictionary;

export const update = (user: Partial<UserState>, actionName: ActionName) =>
  setStore(StoreType.User, (state) => ({ ...state, ...user }), actionName);

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

export const loginByEmail = async (): Promise<void> => {
  const event = { loginBy: "email" };
  return handleLogin({ ...signin, event }, async () => null);
};

export const signUpByEmail = async (): Promise<void> => {
  const event = { loginBy: "signup" };
  return handleLogin({ ...signup, event }, async () =>
    null
  );
};

export const loginBySocial = async (name: SocialNames): Promise<void> => {
  const event = { loginBy: name.toLowerCase() };
  return handleLogin({ ...socialLogin, event }, async () => {
    if (name === SocialNames.Google) return null;
    if (name === SocialNames.Facebook) return null;
    throw new Error("Not integrated social method to login");
  });
};

export const validate = async () => {
  const { guest } = getStore(StoreType.User);
  if (guest) {
    if (typeof localStorage != "undefined") {
      const localToken = localStorage.getItem("authorization")
      if (localToken) {
        update(
          { fetching: false, fetched: true, error: false, token: localToken, guest: false },
          ActionName.Initialize
        );
        return;
      }
    }
    update(errorFetchState, ActionName.Error);
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
    const { user } = await getUserProfile();
    update(user, ActionName.Add);
    update(fetchedState, ActionName.Fetched);
  } catch (error) {
    update(errorFetchState, ActionName.Error);
    throw new Error();
  }
};

const expireUser = async () => {
  // notifyError(`${signout.expired}. ${signout.redirect}`);
  // setTimeout(() => {
  //   handleLogout();
  //   update(errorFetchState, ActionName.Error);
  //   Router.push(Login.getURLLogin());
  // }, 4000);
};
