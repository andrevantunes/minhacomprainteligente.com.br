import type { TitleProps } from "./title.types";
import { Caption, Display, Heading, ItemText, Subtitle } from "@andrevantunes/andrevds";

import classNames from "classnames";
import { isChildrenAsTypeProps } from "@/helpers/adapter-component.helper";
import { sanitize } from "@/helpers/sanitize.helpers";

const Title = (props: TitleProps) => {
  if (isChildrenAsTypeProps(props.children) && typeof props.children === "object") {
    const cn = classNames(props.className, (props.children as any)?.className);
    return <_Title {...props} {...(props.children as any)} className={cn} />;
  }
  return <_Title {...props} />;
};

const _Title = ({ html, className, children, variant, ...props }: TitleProps) => {
  const Component = getComponentByVariant(variant);
  const cn = classNames("title", className);
  if (typeof html === "string") {
    return (
      <Component className={cn} {...props} dangerouslySetInnerHTML={{ __html: sanitize(html) }} />
    );
  }
  return (
    <Component className={cn} {...props}>
      {children}
    </Component>
  );
};

const getComponentByVariant = (variant = "heading") => {
  const componentList: Record<string, any> = {
    caption: Caption,
    display: Display,
    heading: Heading,
    subtitle: Subtitle,
    item: ItemText,
  };
  return componentList[variant] || Heading;
};

export default Title;
