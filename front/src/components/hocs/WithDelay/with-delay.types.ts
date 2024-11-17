import type { HTMLProps, PropsWithChildren } from "react";

interface WithDelayProps extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
  delay?: number;
}

export type { WithDelayProps };
