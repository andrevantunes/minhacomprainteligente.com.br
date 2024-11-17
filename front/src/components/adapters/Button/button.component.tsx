import type { ButtonProps } from "./button.types";

import { Button as MarsButton, Loader } from "@andrevantunes/andrevds";
import NextLink from "next/link";
import { removeBasePath, isExternalLink } from "@/helpers/links.helpers";

const Button = ({
  backgroundColor,
  color,
  style,
  href,
  children,
  fetching,
  ...props
}: ButtonProps) => {
  const computedStyle = { backgroundColor, color, ...style };
  if (!href || isExternalLink(href)) {
    return (
      <MarsButton style={computedStyle} href={href} {...props}>
        {fetching ? <Loader size="sm" /> : children}
      </MarsButton>
    );
  }
  return (
    <NextLink href={removeBasePath(href)}>
      <MarsButton as={"a"} href={removeBasePath(href)} {...props}>
        {fetching ? <Loader size="sm" /> : children}
      </MarsButton>
    </NextLink>
  );
};

export default Button;
