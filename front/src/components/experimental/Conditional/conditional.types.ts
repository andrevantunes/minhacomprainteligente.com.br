import { RiboProps } from "@mesalva/ribo";
import type { HTMLAttributes } from "react";

interface ConditionalProps extends HTMLAttributes<HTMLDivElement> {
  isTrue?: boolean;
  elseChildren?: RiboProps["children"];
}

export type { ConditionalProps };
