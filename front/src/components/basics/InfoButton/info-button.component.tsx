import type { InfoButtonProps } from "./info-button.types";

import { Modal, ModalSizes, ToggleButton } from "@andrevantunes/andrevds";

import { ModalContent } from "@/components";

const InfoButton = ({
  iconName = "info",
  variant = "text",
  title = "Informações",
  modalProps,
  children,
  ...props
}: InfoButtonProps) => {
  const Content = () => (
    <ModalContent className="info-button__modal" title={title} {...modalProps}>
      {children}
    </ModalContent>
  );

  const openInfo = () => {
    Modal.open(Content, {
      size: ModalSizes.Small,
    });
  };

  return (
    <ToggleButton
      className="info-button"
      iconName={iconName}
      variant={variant}
      {...props}
      onClick={openInfo}
    />
  );
};

export default InfoButton;
