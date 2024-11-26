import type { HTMLProps, PropsWithChildren } from "react";

interface CheckoutProductProps extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
  price: number;
  labels: string[];
  quantity: number;
  productId: number;
  elevation: string;
  onIncrease?: (a: any) => any;
  onDecrease?: (a: any) => any;
}

export type { CheckoutProductProps };
