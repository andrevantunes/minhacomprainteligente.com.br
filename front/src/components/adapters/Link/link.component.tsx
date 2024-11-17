import type { LinkProps } from "./link.types";

import { Link as MarsLink } from "@andrevantunes/andrevds";
import NextLink from "next/link";
import { removeBasePath, isExternalLink } from "@/helpers/links.helpers";

const Link = ({ children, href, ...props }: LinkProps) => {
  if (!href || isExternalLink(href)) {
    return (
      <MarsLink href={href} {...props}>
        {children}
      </MarsLink>
    );
  }

  return (
    <NextLink href={removeBasePath(href)}>
      <MarsLink as="a" href={href} {...props}>
        {children}
      </MarsLink>
    </NextLink>
  );
};

export default Link;
