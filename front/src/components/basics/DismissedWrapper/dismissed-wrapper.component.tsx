import type { DismissedWrapperComponentProps } from "./dismissed-wrapper.types";

import { useEffect, useState } from "react";
import { Notification } from "@andrevantunes/andrevds";
import classNames from "classnames";

import * as Cookies from "@/helpers/cookie.helper";

const DismissedWrapper = ({
  closeable,
  closed = false,
  id,
  reopenAfterDays = 365,
  closingMessage,
  children,
  className,
  ...props
}: DismissedWrapperComponentProps) => {
  const [dismissed, setDismissed] = useState(closed);
  const [dismissing, setDismissing] = useState(false);

  const isClosableEnabled = closeable && !!id;
  const COOKIE_NAME = `dismissed-${id}-notification`;
  const cn = classNames("dismissed-wrapper", className, {
    "dismissed-wrapper--is-closable": isClosableEnabled,
    "dismissed-wrapper--dismissing": dismissing,
  });

  useEffect(() => {
    if (!id) return;
    const cookies = Cookies.get({});
    const hasCookie = !!cookies[COOKIE_NAME];
    setDismissed(hasCookie);
  }, []);

  useEffect(() => {
    if (closed) handleClose();
  }, [closed]);

  const handleClose = () => {
    Cookies.set({}, COOKIE_NAME, "true", { maxAge: 60 * 60 * 24 * reopenAfterDays });
    setDismissing(true);
    if (closingMessage) Notification.info(closingMessage);
    setTimeout(() => setDismissed(true), 350);
  };

  if (dismissed) return null;

  return (
    <div className={cn} {...props}>
      {children}
    </div>
  );
};

export default DismissedWrapper;
