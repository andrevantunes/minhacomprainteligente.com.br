import { PaginationProps } from "@andrevantunes/andrevds";
import type { HTMLProps, PropsWithChildren } from "react";
import { ComponentItemProps } from "../ComponentItem";

export interface ComponentListSingleProps {
  list?: ComponentItemProps[];
  emptyMessage?: string;
  pagination?: PaginationProps;
  enableFilter?: boolean;
  filterLabel?: string;
}

type Base = PropsWithChildren<Omit<HTMLProps<HTMLDivElement>, "list">>;

export type ComponentListProps = Base & ComponentListSingleProps;
