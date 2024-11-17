import type { HTMLProps, PropsWithChildren } from "react";

interface WithRouterProps extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
  include: string | string[];
  exclude?: string | string[];
}

export type { WithRouterProps };
