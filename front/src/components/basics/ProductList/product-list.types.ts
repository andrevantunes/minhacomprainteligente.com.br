import type { HTMLProps, PropsWithChildren } from "react";

interface ProductListProps extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
  propertyProducts: any[];
}

export type { ProductListProps };
