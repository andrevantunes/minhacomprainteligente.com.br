import { AuthSocial } from "@/types";
import { Dispatch, SetStateAction } from "react";

export interface AuthProps {
  sign?: "in" | "up";
  setSign?: Dispatch<SetStateAction<AuthProps["sign"]>>;
  close?: () => void;
  context: "page" | "modal";
}

export interface AuthState {
  isFetching: boolean;
  platformSlug: string;
}

export interface AuthSocialProps extends AuthState, AuthSocial {}
