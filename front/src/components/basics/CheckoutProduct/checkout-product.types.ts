import type { HTMLProps, PropsWithChildren } from "react";

interface CheckoutProductProps extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
  price: number;
  labels: string[];
  quantity: number;
  productId: number;
  onIncrease?: (a: any) => any;
  onDecrease?: (a: any) => any;
}

export type { CheckoutProductProps };
