import type { HTMLProps, PropsWithChildren } from "react";

export enum BulletColors {
  ortografia = "var(--color-bullet-ortografia-500)",
  regencia = "var(--color-bullet-regencia-500)",
  semantica = "var(--color-bullet-semantica-500)",
  concordancia = "var(--color-bullet-concordancia-500)",
  pontuacao = "var(--color-bullet-pontuacao-500)",
  diverso = "var(--color-bullet-diverso-500)",
}

export enum BulletGhostColors {
  ortografia = "var(--color-bullet-ortografia-ghost)",
  regencia = "var(--color-bullet-regencia-ghost)",
  semantica = "var(--color-bullet-semantica-ghost)",
  concordancia = "var(--color-bullet-concordancia-ghost)",
  pontuacao = "var(--color-bullet-pontuacao-ghost)",
  diverso = "var(--color-bullet-diverso-ghost)",
}

export interface Mark {
  title: string;
  type: keyof typeof BulletColors | keyof typeof BulletGhostColors;
  comment: string;
  code: string;
  coordinate: {
    x: number;
    y: number;
  };
}

interface EssayCorrectionProps extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
  image: string;
  marks: Mark[];
}

export type { EssayCorrectionProps };
