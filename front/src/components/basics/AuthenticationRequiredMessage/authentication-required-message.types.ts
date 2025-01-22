import type { HTMLProps, PropsWithChildren } from "react";

interface AuthenticationRequiredMessageProps extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
  destinyRoute?: string;
}

export type { AuthenticationRequiredMessageProps };
