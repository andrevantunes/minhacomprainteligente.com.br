export enum AuthType {
  SignIn = "SignIn",
  SignUp = "SignUp",
  SignOut = "SignOut",
}

export enum SocialNames {
  Google = "Google",
  Facebook = "Facebook",
}

export interface AuthSocial {
  name: SocialNames;
  iconName: string;
}
