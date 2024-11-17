import type { HTMLProps } from "react";

interface DangerousHTMLProps extends Omit<HTMLProps<HTMLElement>, "as"> {
  as?: any;
  html?: string;
}

export type { DangerousHTMLProps };
