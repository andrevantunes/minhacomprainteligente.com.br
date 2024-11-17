import type { ConditionalProps } from "./conditional.types";

import { Ribo } from "@/components";
import classNames from "classnames";

const Conditional = ({ children, className, isTrue, elseChildren, ...props }: ConditionalProps) => {
  const cn = classNames("conditional", className);
  return (
    <div className={cn} {...props}>
      {isTrue ? children : elseChildren ? <Ribo>{elseChildren}</Ribo> : null}
    </div>
  );
};

export default Conditional;
