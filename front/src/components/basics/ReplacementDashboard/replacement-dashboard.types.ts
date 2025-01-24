import type { HTMLProps, PropsWithChildren } from "react";

interface ReplacementDashboardProps extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
  replacements?: any[];
}

export type { ReplacementDashboardProps };
