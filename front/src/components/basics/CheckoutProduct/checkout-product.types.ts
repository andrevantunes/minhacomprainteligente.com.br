import type { HTMLProps, PropsWithChildren } from "react";

interface CheckoutProductProps extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
  price: number;
  labels: string[];
  quantity: number;
}

export type { CheckoutProductProps };
