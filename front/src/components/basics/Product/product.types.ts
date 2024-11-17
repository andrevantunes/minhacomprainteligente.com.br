import type { HTMLProps, PropsWithChildren } from "react";

interface ProductProps extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
  elevation: string;
  price: string;
  src: string;
}

export type { ProductProps };
