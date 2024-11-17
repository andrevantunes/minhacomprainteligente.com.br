import { SocialNames } from "@/types";

export type AuthLogin = () => Promise<void>;

export interface AuthSocial {
  name: SocialNames;
  iconName: string;
}
