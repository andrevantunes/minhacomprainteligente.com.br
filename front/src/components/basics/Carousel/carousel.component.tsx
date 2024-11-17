import type { CarouselProps } from "./carousel.types";

import { useCallback, useEffect, useState } from "react";
import useEmblaCarousel from "embla-carousel-react";

import classNames from "classnames";
import { parseNumericValue } from "@/helpers/styles.helper";

const Carousel = ({
  children,
  className,
  height,
  hideDots,
  style,
  onSelect,
  currentIndex,
  ...props
}: CarouselProps) => {
  const [viewportRef, embla] = useEmblaCarousel({ skipSnaps: false });

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [scrollSnaps, setScrollSnaps] = useState<number[]>([]);

  const computedStyle = { "--height": parseNumericValue(height), ...style };
  const cn = classNames("carousel", className);

  const scrollTo = useCallback((index: number) => embla && embla.scrollTo(index), [embla]);

  const handleSelect = useCallback(() => {
    if (!embla) return;
    const newIndex = embla.selectedScrollSnap();
    setSelectedIndex(newIndex);
    onSelect?.(newIndex);
  }, [embla, setSelectedIndex]);

  useEffect(() => {
    if (!embla) return;
    handleSelect();
    setScrollSnaps(embla.scrollSnapList());
    embla.on("select", handleSelect);
  }, [embla, setScrollSnaps, handleSelect]);

  useEffect(() => {
    if (typeof currentIndex === "number" && currentIndex !== selectedIndex) {
      scrollTo(currentIndex);
    }
  }, [currentIndex]);

  return (
    <div className={cn} {...props} ref={viewportRef} style={computedStyle}>
      <div className="carousel__container">{children}</div>

      {!hideDots && scrollSnaps.length > 1 && (
        <div className="carousel__dots dots">
          {scrollSnaps.map((_, index) => (
            <button
              key={index}
              className={classNames("dots__button", {
                "dots__button--is-current": index === selectedIndex,
              })}
              onClick={() => scrollTo(index)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Carousel;
