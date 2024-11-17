import { Container } from "@/types";
import type { HTMLProps, PropsWithChildren } from "react";

interface SectionBaseProps
  extends Pick<
    PropsWithChildren<HTMLProps<HTMLDivElement>>,
    "id" | "className" | "style" | "children"
  > {
  container?: Container;
  backgroundColor?: string;
  color?: string;
}

export type { SectionBaseProps };
