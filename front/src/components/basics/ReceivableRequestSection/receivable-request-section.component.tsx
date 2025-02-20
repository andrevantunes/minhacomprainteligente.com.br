import type { ReceivableRequestSectionProps } from "./receivable-request-section.types";

import classNames from "classnames";

const ReceivableRequestSection = ({
  children,
  className,
  ...props
}: ReceivableRequestSectionProps) => {
  const cn = classNames("receivable-request-section", className);
  return (
    <div className={cn} {...props}>
      {children}
    </div>
  );
};

export default ReceivableRequestSection;
