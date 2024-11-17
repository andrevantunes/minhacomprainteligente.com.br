import UserCrendentials from "@mesalva/react-login/dist/services/UserCredentialsService";

declare global {
  interface Window {
    Intercom: Function;
  }
}

export const getUser = () => UserCrendentials.get();

export const logout = () => {
  const credentialsName = process.env["CREDENTIALS_COOKIE_NAME"] || "user-credentials";

  UserCrendentials.del();

  if (typeof window === "undefined") return
  if (localStorage.getItem(credentialsName)) localStorage.removeItem(credentialsName as string);
  if (window.Intercom) window.Intercom("shutdown");
};
