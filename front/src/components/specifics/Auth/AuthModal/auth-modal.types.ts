import { ButtonProps } from "@/components/adapters/Button";
import { ModalProps } from "@andrevantunes/andrevds";
import type { HTMLProps, PropsWithChildren } from "react";

interface AuthModalButtonProps extends Omit<ButtonProps, "OnClick"> {
  onClick: () => void;
  hideIfAuth: boolean;
}

interface AuthModalProps extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
  onClose: ModalProps["onClose"];
}

export type { AuthModalProps, AuthModalButtonProps };
