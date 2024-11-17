import type { EssayGradeAccordionProps } from "./essay-grade-accordion.types";

import { Accordion, Heading, Icon, Text } from "@andrevantunes/andrevds";
import classNames from "classnames";

const EssayGradeAccordion = ({
  criterium,
  name,
  description,
  grade,
  variant,
  className,
  ...props
}: EssayGradeAccordionProps) => {
  const cn = classNames("essay-grade-accordion", className);

  return (
    <Accordion
      className={cn}
      {...props}
      headerComponent={() => (
        <div className="essay-grade-accordion__header">
          <div className="essay-grade-accordion__header__info">
            <Text className="essay-grade-accordion__header__info__criterium">{criterium}</Text>
            <Heading level={6} size="xs">
              {name}
            </Heading>
          </div>
          <div
            className="essay-grade-accordion__header__grade"
            data-testid="grade"
            style={{ color: variant }}
          >
            <Heading level={5}>{grade}</Heading>
          </div>
          <Icon className="accordion__header-container__icon-toggle" name="chevron-down" />
        </div>
      )}
    />
  );
};

export default EssayGradeAccordion;
