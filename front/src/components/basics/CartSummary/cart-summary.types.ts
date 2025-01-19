import type { HTMLProps, PropsWithChildren } from "react";

interface CartSummaryProps extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
  products: any[];
  totalPrice: number;
  hash: string;
  billingTypes: {
    pix: boolean;
    paypal: boolean;
    creditCard: boolean;
  };
}

export type { CartSummaryProps };
