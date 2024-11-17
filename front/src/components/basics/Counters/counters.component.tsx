import type { CountersProps } from "./counters.types";

import classNames from "classnames";
import { List } from "@andrevantunes/andrevds";

const Counters = ({ children, className, list, ...props }: CountersProps) => {
  const cn = classNames("counters", className);
  const computedList = Array.isArray(list)
    ? list.map(({ iconName, text }) => ({
        text,
        bulletIconName: iconName,
      }))
    : [];
  return (
    <div className={cn} {...props}>
      <List className="counters__list" list={computedList} />
      {children}
    </div>
  );
};

export default Counters;
