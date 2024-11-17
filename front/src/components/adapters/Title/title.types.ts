import type { ComponentType } from "@/types";
import type { ReactElement, ReactFragment } from "react";

type TitleChildren = undefined | string | TitleProps | null | ReactElement | ReactFragment;

interface TitleProps extends Omit<ComponentType, "children"> {
  variant?: "title" | "subtitle" | "caption" | "item";
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  html?: string;
  level?: number;
  children: TitleChildren;
}

export type { TitleProps, TitleChildren };
