import type { HTMLProps, PropsWithChildren } from "react";

interface PixSectionProps extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
  totalPrice: number;
  hash: string;
  subTitle: string;
}

export type { PixSectionProps };
