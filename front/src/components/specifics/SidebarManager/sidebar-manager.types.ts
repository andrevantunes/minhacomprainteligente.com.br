import { SidebarList } from "@andrevantunes/andrevds";
import type { HTMLProps, PropsWithChildren } from "react";

interface SidebarManagerProps extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
  sidebarItems: SidebarList;
}

export type { SidebarManagerProps };
