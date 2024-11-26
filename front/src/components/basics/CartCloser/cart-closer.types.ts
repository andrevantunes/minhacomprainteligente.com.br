import type { HTMLProps, PropsWithChildren } from "react";
import { ButtonProps } from "@andrevantunes/andrevds";

interface CartCloserProps extends PropsWithChildren<HTMLProps<ButtonProps>> {
  propertyId?: string | number;
}

export type { CartCloserProps };
