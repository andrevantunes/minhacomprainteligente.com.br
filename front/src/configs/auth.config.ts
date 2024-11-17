import { AuthSocial, AuthType, SocialNames } from "@/types";

export const authSocials: AuthSocial[] = [
  {
    name: SocialNames.Google,
    iconName: "google",
  },
  {
    name: SocialNames.Facebook,
    iconName: "facebook",
  },
];

export const authPaths = {
  [AuthType.SignIn]: {
    name: AuthType.SignIn,
    path: "entrar",
  },
  [AuthType.SignUp]: {
    name: AuthType.SignUp,
    path: "cadastro",
  },
  [AuthType.SignOut]: {
    name: AuthType.SignOut,
    path: "sair",
  },
};

export const authEnabled = {
  enemSubscriptionId: false,
};
