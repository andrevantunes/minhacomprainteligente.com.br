import type { SeoProps } from "@/components";
import type { SkeletonProps } from "@andrevantunes/andrevds";

interface Page extends Partial<SeoProps> {
  component: string;
  authenticated?: boolean;
  children: Section[];
}

interface Section {
  component: string;
  controller?: string;
  skeleton?: SkeletonProps["variant"];
  [prop: string]: any;
}

export type { Page, Section };
