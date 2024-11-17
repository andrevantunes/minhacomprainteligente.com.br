import type { HTMLProps, PropsWithChildren } from "react";
import { Mark } from "../EssayCorrection";

interface EssayCorrectedImageProps extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
  image: string;
  fetching: boolean;
  full: boolean;
  marks: Mark[];
  activeMark: number;
  setActiveMark: (index: number) => void;
}

export type { EssayCorrectedImageProps };
