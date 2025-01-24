import type { HTMLProps, PropsWithChildren } from "react";

interface ReplacementListProps extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
  propertyProducts?: any[];
  status?: string;
  replacementId?: number;
}

export type { ReplacementListProps };
