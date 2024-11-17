import type { LabelListProps, LabelItemProps } from "./label-list.types";

import { Label, SubjectLabel } from "@andrevantunes/andrevds";
import classNames from "classnames";

const LabelList = ({ list = [], className }: LabelListProps) => {
  const cn = classNames("label-list", className);
  return (
    <div className={cn}>
      {list.map((label, key) => (
        <LabelItem {...label} key={key} />
      ))}
    </div>
  );
};

const LabelItem = ({ theme, variant, children }: LabelItemProps) => {
  if (typeof children !== "string") return null;
  if (variant && theme === "subject") {
    return <SubjectLabel variant={variant as any}>{children}</SubjectLabel>;
  }
  return (
    <Label className="mr-sm" theme={theme} variant={variant}>
      {children}
    </Label>
  );
};

export default LabelList;
