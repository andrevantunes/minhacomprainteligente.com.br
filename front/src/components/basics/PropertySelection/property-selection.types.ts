import type { HTMLProps, PropsWithChildren } from "react";

interface PropertySelectionProps extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
  src: string;
  href: string;
  name: string;
  checkAllowed?: boolean;
  buttonLabel?: string;
  buttonFull?: boolean;
  buttons?: {
    full: boolean;
    children: string;
    href?: string;
  }[];
}

export type { PropertySelectionProps };
