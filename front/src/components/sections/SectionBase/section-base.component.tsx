import type { SectionBaseProps } from "./section-base.types";

import classNames from "classnames";

const SectionBase = ({
  children,
  className,
  container = "lg",
  backgroundColor,
  color,
  style,
  ...props
}: SectionBaseProps) => {
  const cn = classNames("section-base", className);
  const stl = { backgroundColor, color, ...style };
  return (
    <section className={cn} style={stl} {...props}>
      <div
        className={classNames("section-base__container", {
          [`section-base__container--${container}`]: container,
        })}
      >
        {children}
      </div>
    </section>
  );
};

export default SectionBase;
