import { AuthProps } from "@/components/specifics/Auth/auth.types";
import { Dispatch, SetStateAction } from "react";

export interface AuthModalContextProps {
  isOpen: boolean;
  open: () => void;
  close: () => void;
  toggle: () => void;
  sign: AuthProps["sign"];
  setSign: Dispatch<SetStateAction<AuthProps["sign"]>>;
  toggleSign: () => void;
  isSignIn: boolean;
  isSignUp: boolean;
}

export interface AuthModalContextProviderProps {
  children: React.ReactNode;
}
