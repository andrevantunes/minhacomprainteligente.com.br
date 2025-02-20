import type { WithdrawBalanceSectionProps } from "./withdraw-balance-section.types";

import classNames from "classnames";

const WithdrawBalanceSection = ({ children, className, ...props }: WithdrawBalanceSectionProps) => {
  const cn = classNames("withdraw-balance-section", className);
  return (
    <div className={cn} {...props}>
      {children}
    </div>
  );
};

export default WithdrawBalanceSection;
