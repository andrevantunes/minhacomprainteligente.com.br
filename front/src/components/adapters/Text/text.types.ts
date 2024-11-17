import type { TextProps as MarsTextProps } from "@andrevantunes/andrevds";
import { ReactElement, ReactFragment } from "react";

export type TextChildren = undefined | string | TextProps;

export interface TextProps extends Omit<MarsTextProps, "children"> {
  html?: string;
  children?: TextChildren | ReactElement | number | null | ReactFragment;
}
