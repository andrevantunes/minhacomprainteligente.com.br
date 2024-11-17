import type { AuthModalButtonProps, AuthModalProps } from "./auth-modal.types";

import { Button, Modal, ModalSizes } from "@andrevantunes/andrevds";
import Auth from "../auth.component";
import { useContext } from "react";
import { AuthModalContext } from "@/contexts/AuthModalContext/auth-modal-context.component";
import { StoreType, useStore } from "@/store";

const AuthModal = ({ children, onClose, ...props }: AuthModalProps) => {
  const { close, sign, setSign } = useContext(AuthModalContext);

  return (
    <Modal size={ModalSizes.Small} onClose={onClose} close={() => true}>
      <Auth context="modal" sign={sign} setSign={setSign} close={close} {...props} />
    </Modal>
  );
};

export const AuthModalButton = ({
  children,
  onClick,
  hideIfAuth = false,
  ...props
}: AuthModalButtonProps) => {
  const [user] = useStore(StoreType.User);
  const isAuth = !user.guest && user.fetched;
  const { open } = useContext(AuthModalContext);

  if (isAuth && hideIfAuth) return <></>;

  return (
    <Button onClick={() => (isAuth ? onClick?.() : open())} {...props}>
      {children}
    </Button>
  );
};

export default AuthModal;
