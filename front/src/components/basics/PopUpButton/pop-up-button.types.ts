import { ButtonProps, ModalContentProps } from "@/components";
import { ModalProps } from "@andrevantunes/andrevds";

interface PopUp extends ModalContentProps {
  size?: ModalProps["size"];
  backgroundColor?: string;
  color?: string;
  // buttons?: ButtonListProps["list"];
}

interface PopUpButtonProps extends Omit<ButtonProps, "href"> {
  popUp?: PopUp;
}

export type { PopUpButtonProps, PopUp };
