import type { NotificationModalProps, RcPortal } from "./notification-modal.types";

import { ReactNode, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import { Modal, ModalSizes } from "@andrevantunes/andrevds";
import classNames from "classnames";

import * as Cookies from "@/helpers/cookie.helper";

const NotificationModal = ({
  children,
  className,
  backgroundColor,
  color,
  style,
  trigger = "timeout",
  timeout = 0,
  position,
  closeable,
  id,
  reopenAfterDays = 365,
  ...props
}: NotificationModalProps) => {
  const router = useRouter();
  const modalRef = useRef<null | RcPortal>(null);
  const isClosableEnabled = closeable && !!id;
  const COOKIE_NAME = id ? `dismissed-${id}-modal` : "";

  const isClosed = () => {
    if (!isClosableEnabled) return false;
    const cookies = Cookies.get({});
    return !!cookies[COOKIE_NAME];
  };

  const handleClose = () => {
    Cookies.set({}, COOKIE_NAME, "true", { maxAge: 60 * 60 * 24 * reopenAfterDays });
  };

  const openModal = () => {
    const modalProps = {
      size: ModalSizes.Medium,
      className: classNames("notification-modal", className),
      style: { backgroundColor, color, ...style },
      onClose: handleClose,
      ...props,
    };

    modalRef.current = Modal.open(() => <>{children as ReactNode}</>, modalProps);
  };

  const handlePageOut = () => {
    const onRouteChangeStart = () => {
      openModal();
      router.events.off("routeChangeStart", onRouteChangeStart);
    };

    const onUnload = () => {
      openModal();
      window.removeEventListener("beforeunload", onUnload);
    };

    const onMouseMove = (event: MouseEvent) => {
      if (event.movementY < 0 && event.clientY < 50) {
        openModal();
        window.removeEventListener("mousemove", onMouseMove);
      }
    };

    setTimeout(() => {
      router.events.on("routeChangeStart", onRouteChangeStart);
      window.addEventListener("beforeunload", onUnload);
      window.addEventListener("mousemove", onMouseMove);
    }, timeout);
  };

  const handleScroll = () => {
    const viewHeight = window.innerHeight;
    const positionY = position ?? viewHeight / 3;
    const onScroll = () => {
      const currentPosition = window.scrollY;
      if (currentPosition > positionY) {
        openModal();
        document.removeEventListener("scroll", onScroll);
      }
    };
    document.addEventListener("scroll", onScroll);
  };

  const handleTimeout = () => {
    setTimeout(openModal, timeout);
  };

  const triggers = {
    pageout: handlePageOut,
    scroll: handleScroll,
    timeout: handleTimeout,
  };

  useEffect(() => {
    if (isClosed()) return;

    triggers[trigger]?.();
    return () => {
      modalRef.current?.close?.();
    };
  }, []);

  return null;
};

export default NotificationModal;
