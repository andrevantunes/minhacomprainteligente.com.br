import type { FetchState } from "@/store";
import type { User as UserEntity } from "@mesalva/react-login/dist/models/UserEntity";
import { Accesses } from "./accesses.types";

export type User = UserEntity;

export interface UserState extends UserProfile, FetchState {}

interface Role {
  name: string;
  slug: string;
}

export interface UserProfile {
  birthDate: string | null;
  email: string;
  enemSubscriptionId: string | null;
  guest: boolean;
  image: string | null;
  name: string;
  phone: string | null;
  firstLogin: boolean;
  roles: Role[];
  settings: {
    course?: string | null;
    uf?: string | null;
    [props: string]: any;
  };
  token: string;
  uid: string;
  crmEmail: string | null;
  persona: {
    name: string;
    slug: string;
    brandImage: string | null;
  };
  educationLevel?: EducationLevel;
  objective?: Objective;
  platformSlug?: string;
}

interface Objective {
  name: string;
  id: string;
}

interface EducationLevel {
  name: string;
  id: string;
}

export interface UserFullProfile {
  accesses: Accesses;
  user: UserProfile;
}

export interface UserAccesses {
  guest: boolean;
  hasImage: boolean;
  hasPhone: boolean;
  hasWhatsapp: boolean;
  roles: string[];
  isBirthday: boolean;
}
