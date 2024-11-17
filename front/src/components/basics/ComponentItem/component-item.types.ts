import type { AvatarProps, DropdownMenuProps, IconProps } from "@andrevantunes/andrevds";
import type { HTMLProps } from "react";
import type { LabelItemProps, LinkProps } from "@/components";
import { TitleProps } from "@/components/adapters/Title";
import { CSSProperties } from "react";

interface ComponentItemProps extends Omit<HTMLProps<HTMLLIElement>, "title"> {
  title: TitleProps;
  overline: string;
  overlineStyle: CSSProperties;
  caption: string;
  link?: LinkProps;
  labels?: LabelItemProps[];
  avatar?: AvatarProps;
  actions?: DropdownMenuProps["list"] & { url?: string };
  icon?: IconProps;
  isLast?: boolean;
  checked?: boolean;
  checkRight?: boolean;
  status?: string;
}

export type { ComponentItemProps };
