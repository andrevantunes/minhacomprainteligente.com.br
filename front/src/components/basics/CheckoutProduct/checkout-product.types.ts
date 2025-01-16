import type { HTMLProps, PropsWithChildren } from "react";

interface CheckoutProductProps extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
  price: number;
  saleQuantity: number;
  currentQuantity: number;
  expectedQuantity: number;
  productId: number;
  elevation: string;
  labels?: string[];
  onIncrease?: (a: any) => any;
  onDecrease?: (a: any) => any;
}

export type { CheckoutProductProps };
