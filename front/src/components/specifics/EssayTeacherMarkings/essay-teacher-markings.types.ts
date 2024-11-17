import type { HTMLProps, PropsWithChildren } from "react";
import { Mark } from "../EssayCorrection";

interface EssayTeacherMarkingsProps extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
  setActiveMark: (index: number) => void;
  activeMark: number;
  marks?: Mark[];
}

export type { EssayTeacherMarkingsProps };
