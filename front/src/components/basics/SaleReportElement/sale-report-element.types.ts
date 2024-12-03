import type { HTMLProps, PropsWithChildren } from "react";

interface SaleReportElementProps extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
  iconName?: string;
  propertyName?: string;
  amount?: string;
  status?: string;
  createdAt?: string;
  name?: string;
  paymentMethod?: string;
}

export type { SaleReportElementProps };
