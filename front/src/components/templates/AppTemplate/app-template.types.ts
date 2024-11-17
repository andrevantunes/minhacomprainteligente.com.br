import { Container } from "@/types";
import type { HTMLProps, PropsWithChildren } from "react";

export interface AppTemplateProps extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
  component: string;
  chatSupport?: string;
  container?: Container;
}
