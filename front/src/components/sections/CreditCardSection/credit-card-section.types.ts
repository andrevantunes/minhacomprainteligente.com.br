import type { HTMLProps, PropsWithChildren } from "react";

interface CreditCardSectionProps extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
  totalPrice: number;
  hash: string;
}

export type { CreditCardSectionProps };
