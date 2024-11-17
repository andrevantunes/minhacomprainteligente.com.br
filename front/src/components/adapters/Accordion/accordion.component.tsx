import type { AccordionProps, AccordionHeaderProps } from "./accordion.types";
import { Accordion as AccordionMars, Icon } from "@andrevantunes/andrevds";

import classNames from "classnames";
import { Title } from "@/components";

const Accordion = ({ active, children, className, disabled, ...props }: AccordionProps) => {
  const cn = classNames("accordion", className, {
    "accordion--active": active,
    "accordion--disabled": disabled,
  });
  return (
    <AccordionMars className={cn} {...props} headerComponent={AccordionHeader}>
      {children}
    </AccordionMars>
  );
};

const AccordionHeader = ({ title }: AccordionHeaderProps) => (
  <div className="accordion__header-container">
    {title && (
      <Title level={3} size="xs" className="accordion__header-container__title">
        {title}
      </Title>
    )}
    <Icon className="accordion__header-container__icon-toggle" name="chevron-down" />
  </div>
);

export default Accordion;
