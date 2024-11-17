import type { DismissedWrapperProps } from "@/components";
import { ButtonProps } from "@/components/adapters/Button";
import type { HTMLProps, PropsWithChildren } from "react";

interface CardYoutubeNotificationProps
  extends PropsWithChildren<HTMLProps<HTMLDivElement>>,
    DismissedWrapperProps {
  videoId?: string;
  closeButton?: ButtonProps;
}

interface CardYoutubeProps
  extends PropsWithChildren<HTMLProps<HTMLDivElement>>,
    DismissedWrapperProps {
  onClose: VoidFunction;
  isCloseEnabled: boolean;
  videoId?: string;
  closeButton?: ButtonProps;
}

export type { CardYoutubeNotificationProps, CardYoutubeProps };
