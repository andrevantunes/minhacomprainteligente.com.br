import type { HTMLProps, PropsWithChildren } from "react";
import type { AccordionProps as AccordionPropsMars } from "@andrevantunes/andrevds";
import type { TitleProps } from "@/components";

interface AccordionProps extends PropsWithChildren<HTMLProps<HTMLDivElement>>, AccordionPropsMars {
  active?: boolean;
  disabled?: boolean;
}

interface AccordionHeaderProps {
  title?: TitleProps;
}

export type { AccordionProps, AccordionHeaderProps };
