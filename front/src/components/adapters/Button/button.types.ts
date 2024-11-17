import type { ButtonProps as MarsButtonProps } from "@andrevantunes/andrevds";

interface ButtonProps extends MarsButtonProps {
  backgroundColor?: string;
  color?: string;
  fetching?: boolean;
}

export type { ButtonProps };
