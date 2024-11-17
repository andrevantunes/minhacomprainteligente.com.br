import type { NavigationItemProps } from "@/components/basics/NavigationItem";
import type { HTMLProps, PropsWithChildren } from "react";

type GroupNavigationButtonProps = null | {
  href?: string;
  disabled?: boolean;
};

interface GroupNavigationProps extends Omit<PropsWithChildren<HTMLProps<HTMLDivElement>>, "list"> {
  targetId?: string;
  title: string;
  list: NavigationItemProps[];
  previous?: GroupNavigationButtonProps;
  next?: GroupNavigationButtonProps;
}

export type { GroupNavigationProps };
