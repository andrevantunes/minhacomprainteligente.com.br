import { createContext, useState } from "react";
import { AuthModalContextProps, AuthModalContextProviderProps } from "./auth-modal-context.types";
import { AuthProps } from "@/components/specifics/Auth/auth.types";

export const AuthModalContext = createContext({
  isOpen: false,
  sign: "in",
  setSign: () => {},
  toggleSign: () => {},
  isSignIn: true,
  isSignUp: false,
  open: () => {},
  close: () => {},
  toggle: () => {},
} as AuthModalContextProps);

const AuthModalContextProvider = ({ children }: AuthModalContextProviderProps) => {
  const [show, setShow] = useState(false);
  const [sign, setSign] = useState<AuthProps["sign"]>("in");

  const open = () => setShow(true);
  const close = () => setShow(false);
  const toggle = () => setShow((value) => !value);
  const toggleSign = () => setSign((value) => (value === "in" ? "up" : "in"));
  const isSignIn = sign === "in";
  const isSignUp = sign === "up";

  return (
    <AuthModalContext.Provider
      value={{ isOpen: show, open, close, toggle, sign, setSign, toggleSign, isSignIn, isSignUp }}
    >
      {children}
    </AuthModalContext.Provider>
  );
};

export default AuthModalContextProvider;
