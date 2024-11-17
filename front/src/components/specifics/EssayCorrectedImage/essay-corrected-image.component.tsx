import type { EssayCorrectedImageProps } from "./essay-corrected-image.types";

import classNames from "classnames";
import { SyntheticEvent, useMemo, useState } from "react";
import { Button, Icon, Loader } from "@andrevantunes/andrevds";
import { getImageStyle } from "./essay-corrected-image.helper";
import { BulletColors, BulletGhostColors } from "../EssayCorrection";

const EssayCorrectedImage = ({
  className,
  image,
  marks,
  activeMark,
  setActiveMark,
  full,
  fetching,
  ...props
}: EssayCorrectedImageProps) => {
  const cn = classNames("essay-corrected-image", className);
  const cnContainer = classNames("essay-corrected-image__container", {
    "essay-corrected-image__container--not-full": !full,
  });
  const [ratio, setRatio] = useState(1);
  const [rotation, setRotation] = useState(0);
  const [isMarksVisible, setIsMarksVisible] = useState(true);

  const showImage = !fetching && image;
  const showLoader = fetching || !image;

  const handleOnLoadImage = (event: SyntheticEvent<HTMLImageElement>) => {
    setRatio(event.currentTarget.clientWidth / event.currentTarget.clientHeight);
  };

  const handleRotation = () => {
    const newRotation = rotation + 90;
    setRotation(newRotation >= 360 ? 0 : newRotation);
  };

  const aspectRatio = useMemo(() => {
    if (rotation === 90 || rotation === 270) return 1 / ratio;
    return ratio;
  }, [rotation, ratio]);

  const handleToggleVisibility = () => {
    setIsMarksVisible((isMarksVisible) => !isMarksVisible);
  };

  return (
    <div className={cn} {...props}>
      <div className="essay-corrected-image__actions">
        <Button
          size="sm"
          className="essay-corrected-image__actions__button"
          onClick={handleRotation}
        >
          <Icon size="sm" name="rotate-right" />
        </Button>
        <Button
          size="sm"
          className="essay-corrected-image__actions__button"
          onClick={handleToggleVisibility}
          data-testid="visibility-toggler"
        >
          <Icon size="sm" name={isMarksVisible ? "eye" : "eye-off"} />
        </Button>
        <a
          href={image}
          target="_blank"
          className="essay-corrected-image__actions__button essay-corrected-image__actions__button__link"
          rel="noreferrer"
        >
          <Icon size="sm" name="expand" />
        </a>
      </div>

      <div
        className={cnContainer}
        style={{ "--aspect-ratio": aspectRatio } as any}
        data-testid="image-container"
      >
        {showImage && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={image}
            onLoad={handleOnLoadImage}
            style={getImageStyle(rotation, ratio)}
            alt="Foto da redação"
          />
        )}
        {showLoader && <Loader size="xl" />}
        {marks.map((mark, i) => {
          const isActive = i === activeMark;
          const backgroundColor = isActive ? BulletColors[mark.type] : BulletGhostColors[mark.type];

          return (
            <div
              onClick={() => setActiveMark(i)}
              key={`essay-corrected-image__container__mark-${i}`}
              className={classNames("essay-corrected-image__container__mark", {
                "essay-corrected-image__container__mark--active": isActive,
                "essay-corrected-image__container__mark--hidden": !isMarksVisible,
              })}
              style={{
                backgroundColor,
                top: `${mark.coordinate.y}%`,
                left: `${mark.coordinate.x}%`,
              }}
              data-testid="essay-mark"
            >
              {mark.code}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default EssayCorrectedImage;
