import { DropdownMenuItemProps, ToggleDropdownProps } from "@andrevantunes/andrevds";

interface DropdownActionAdapterProps extends Omit<ToggleDropdownProps, "list"> {
  list: DropDownItemProps[];
}

export interface DropDownItemProps extends Omit<DropdownMenuItemProps, "action"> {
  action?: string;
  successText?: string;
  errorText?: string;
}
export type { DropdownActionAdapterProps };
