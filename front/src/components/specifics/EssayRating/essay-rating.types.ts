import type { HTMLProps, PropsWithChildren } from "react";

interface EssayRatingProps extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
  essayId: string;
  typeformUrl?: string;
}

export type { EssayRatingProps };
