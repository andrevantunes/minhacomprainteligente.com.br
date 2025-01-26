import type { HTMLProps, PropsWithChildren } from "react";

interface HostHeaderProps extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
  backButton?: boolean;
  src?: string;
  text?: string;
}

export type { HostHeaderProps };
