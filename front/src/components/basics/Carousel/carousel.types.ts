import type { HTMLProps, PropsWithChildren } from "react";

interface CarouselProps extends Omit<PropsWithChildren<HTMLProps<HTMLDivElement>>, "onSelect"> {
  height?: string | number;
  hideDots?: boolean;
  onSelect?: (index: number) => void;
  currentIndex?: number;
}

export type { CarouselProps };
