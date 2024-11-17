import type { HTMLProps, PropsWithChildren } from "react";

interface RawScriptProps extends PropsWithChildren<HTMLProps<HTMLScriptElement>> {
  script: string;
}

export type { RawScriptProps };
