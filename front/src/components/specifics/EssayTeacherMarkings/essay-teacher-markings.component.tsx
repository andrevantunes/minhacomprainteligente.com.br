import type { EssayTeacherMarkingsProps } from "./essay-teacher-markings.types";

import classNames from "classnames";
import { Button, Heading, ListItem, Text } from "@andrevantunes/andrevds";
import { BulletColors } from "../EssayCorrection";
import { Carousel } from "@/components/basics/Carousel";

const EssayTeacherMarkings = ({
  children,
  activeMark,
  marks = [],
  className,
  setActiveMark,
  ...props
}: EssayTeacherMarkingsProps) => {
  const markCount = marks.length;
  const firstSelected = activeMark === 0;
  const lastSelected = activeMark === markCount - 1;

  const cn = classNames("essay-teacher-markings", className);

  const handleClickArrowLeft = () => {
    setActiveMark(activeMark - 1);
  };

  const handleClickArrowRight = () => {
    setActiveMark(activeMark + 1);
  };

  return (
    <div className={cn} {...props}>
      <div className="essay-teacher-markings__header">
        <Heading level={6} size="xs">
          Marcações
        </Heading>
        <div className="essay-teacher-markings__header__controls">
          <Button
            size="sm"
            iconName="chevron-left"
            variant="naked"
            className="essay-teacher-markings__header__controls__button"
            disabled={firstSelected}
            onClick={handleClickArrowLeft}
            data-testid="button-arrow-left"
          ></Button>
          <ListItem
            className="essay-teacher-markings__header__controls__counter"
            data-testid="markings-counter"
          >
            {`${activeMark + 1}/${markCount}`}
          </ListItem>
          <Button
            size="sm"
            iconName="chevron-right"
            variant="naked"
            className="essay-teacher-markings__header__controls__button"
            disabled={lastSelected}
            onClick={handleClickArrowRight}
            data-testid="button-arrow-right"
          ></Button>
        </div>
      </div>
      <Carousel hideDots onSelect={(index) => setActiveMark(index)} currentIndex={activeMark}>
        {marks.map(({ code, type, title, comment }, index) => (
          <div
            key={`essay-teacher-markings__slider-container-${index}`}
            className="essay-teacher-markings__body p-xl"
          >
            <div className="essay-teacher-markings__body__title -mx-xl">
              <div
                className="essay-teacher-markings__body__title__mark mx-xl"
                style={{ backgroundColor: BulletColors[type as keyof typeof BulletColors] }}
              >
                {code}
              </div>
              <ListItem className="essay-teacher-markings__body__title__mark-type">
                {title}
              </ListItem>
            </div>
            <Text size="sm" className="essay-teacher-markings__body__text">
              {comment}
            </Text>
          </div>
        ))}
      </Carousel>
    </div>
  );
};

export default EssayTeacherMarkings;
