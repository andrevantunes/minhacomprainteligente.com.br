import type { HTMLProps, PropsWithChildren } from "react";

interface ProductListProps extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
  propertyProducts: any[];
  buttonLabel: string;
}

export type { ProductListProps };
