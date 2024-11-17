import type { LabelProps } from "@andrevantunes/andrevds";

export interface LabelItemProps extends LabelProps {
  children?: any;
  type?: string;
}

export interface LabelListProps {
  list: LabelItemProps[];
  className?: string;
}
