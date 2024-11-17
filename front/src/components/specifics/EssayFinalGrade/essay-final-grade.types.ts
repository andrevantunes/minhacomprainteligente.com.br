import type { HTMLProps, PropsWithChildren } from "react";

interface EssayFinalGradeProps extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
  finalGrade: string | number;
  maxGrade: string | number;
}

export type { EssayFinalGradeProps };
