import type { HTMLProps, PropsWithChildren } from "react";

interface ProductManagementListProps extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
  propertyProducts: any[];
  propertyId: number;
  propertyHash: string;
}

export type { ProductManagementListProps };
