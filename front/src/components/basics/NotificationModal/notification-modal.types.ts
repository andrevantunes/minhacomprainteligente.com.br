import type { ModalChildComponent, ModalProps } from "@andrevantunes/andrevds";
import React from "react";

interface NotificationModalProps extends Omit<ModalProps, "children" | "close"> {
  children: ModalChildComponent | React.ReactNode | string;
  timeout?: number;
  backgroundColor?: string;
  color?: string;
  position?: number;
  trigger?: "timeout" | "scroll" | "pageout";
  closeable?: boolean;
  reopenAfterDays?: number;
}

interface RcPortal {
  close: () => boolean;
  parent: HTMLElement;
  wrapper: HTMLElement;
}

export type { NotificationModalProps, RcPortal };
