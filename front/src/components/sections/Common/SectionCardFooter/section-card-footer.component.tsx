import type { SectionCardFooterProps } from "./section-card-footer.types";

import classNames from "classnames";

const SectionCardFooter = ({ children, className, ...props }: SectionCardFooterProps) => {
  const cn = classNames("section-card-footer", className);
  return (
    <div className={cn} {...props}>
      {children}
    </div>
  );
};

export default SectionCardFooter;
