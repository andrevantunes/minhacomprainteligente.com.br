import { BreadcrumbProps as MarsBreadcrumbProps } from "@andrevantunes/andrevds";

export type BreadcrumbProps = Omit<MarsBreadcrumbProps, "componentLink">;
