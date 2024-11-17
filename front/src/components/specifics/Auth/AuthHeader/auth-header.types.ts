import { AuthProps } from "../auth.types";

export interface AuthHeaderProps {
  sign?: AuthProps["sign"];
  setSign?: AuthProps["setSign"];
  context?: AuthProps["context"];
}
