import { BreadcrumbProps } from "@andrevantunes/andrevds";
import { HTMLProps } from "react";

interface SectionTitleProps extends HTMLProps<HTMLDivElement> {
  title: string;
  breadcrumb?: BreadcrumbProps["list"];
}

export type { SectionTitleProps };
