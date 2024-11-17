import type { TextProps } from "./text.types";

import { Skeleton, SkeletonVariants, Text as MarsText } from "@andrevantunes/andrevds";
import { isChildrenAsTypeProps } from "@/helpers/adapter-component.helper";
import { sanitize } from "@/helpers/sanitize.helpers";

const Text = (props: TextProps) => {
  if (isChildrenAsTypeProps(props.children)) {
    // @ts-ignore
    return <_Text {...props} {...props.children} />;
  }
  return <_Text {...props} />;
};

const _Text = ({ html, children, ...props }: TextProps) => {
  if (typeof html === "string") {
    return <MarsText {...props} dangerouslySetInnerHTML={{ __html: sanitize(html) }} />;
  }
  // @ts-ignore
  return <MarsText {...props}>{children}</MarsText>;
};

Text.Skeleton = () => <Skeleton active variant={SkeletonVariants.Paragraph} />;

export default Text;
