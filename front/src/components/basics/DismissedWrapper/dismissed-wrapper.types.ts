import type { HTMLProps, PropsWithChildren } from "react";

interface DismissedWrapperProps {
  id?: string;
  closeable?: boolean;
  closed?: boolean;
  reopenAfterDays?: number;
  closingMessage?: string;
}

interface DismissedWrapperComponentProps
  extends PropsWithChildren<HTMLProps<HTMLDivElement>>,
    DismissedWrapperProps {}

export type { DismissedWrapperProps, DismissedWrapperComponentProps };
