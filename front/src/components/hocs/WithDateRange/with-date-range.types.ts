import type { HTMLProps, PropsWithChildren } from "react";

interface WithDateRangeProps extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
  startDate: string;
  endDate: string;
  fromISO?: boolean;
  outside?: boolean;
}

export type { WithDateRangeProps };
