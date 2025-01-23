import type { HTMLProps, PropsWithChildren } from "react";

interface ReplacementListProps extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
  propertyProducts?: any[];
  status?: string;
}

export type { ReplacementListProps };
