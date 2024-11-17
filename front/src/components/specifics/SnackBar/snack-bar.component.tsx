import type { SnackBarProps } from "./snack-bar.types";

import classNames from "classnames";
import { DismissedWrapper, ToggleButton } from "@/components";
import { useState } from "react";

const SnackBar = ({
  backgroundColor,
  color,
  children,
  className,
  style,
  id,
  closeable,
  closed,
  reopenAfterDays,
  closingMessage,
  ...props
}: SnackBarProps) => {
  const [isClosed, setIsClosed] = useState(closed);

  const isClosableEnabled = Boolean(id && closeable);
  const cn = classNames("snack-bar", { ["snack-bar--show"]: !isClosed });

  return (
    <DismissedWrapper
      id={id}
      className={cn}
      style={{ backgroundColor, color, ...style }}
      closeable={closeable}
      closed={isClosed}
      reopenAfterDays={reopenAfterDays}
      closingMessage={closingMessage}
    >
      <div className={classNames("snack-bar__content", className)} {...props}>
        {children}
        {isClosableEnabled && (
          <ToggleButton
            variant="text"
            iconName="close"
            className="snack-bar__close-button"
            onClick={() => setIsClosed(true)}
          />
        )}
      </div>
    </DismissedWrapper>
  );
};

export default SnackBar;
