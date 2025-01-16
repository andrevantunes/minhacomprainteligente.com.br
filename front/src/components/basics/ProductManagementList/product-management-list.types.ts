import type { HTMLProps, PropsWithChildren } from "react";

interface ProductManagementListProps extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
  propertyProducts: any[];
  propertyId: number;
}

export type { ProductManagementListProps };
