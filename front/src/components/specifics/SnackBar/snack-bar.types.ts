import type { DismissedWrapperProps } from "@/components";
import type { HTMLAttributes } from "react";

interface SnackBarProps extends HTMLAttributes<HTMLDivElement>, DismissedWrapperProps {
  backgroundColor?: string;
  color?: string;
}

export type { SnackBarProps };
