import type { HTMLProps, PropsWithChildren } from "react";

interface SaleReportElementProps extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
  status: string;
  iconName?: string;
  propertyName?: string;
  amount?: string;
  createdAt?: string;
  name?: string;
  paymentMethod?: string;
  hash?: string;
  products?: any[];
}

export type { SaleReportElementProps };
