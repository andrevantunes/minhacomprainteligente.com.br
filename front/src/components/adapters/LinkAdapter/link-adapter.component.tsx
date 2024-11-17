import type { LinkAdapterProps } from "./link-adapter.types";

import { removeBasePath, isExternalLink } from "@/helpers/links.helpers";

import NextLink from "next/link";

const LinkAdapter = ({ href, ...props }: LinkAdapterProps) => {
  if (!href || isExternalLink(href)) return <a href={href} {...props} />;

  return (
    <NextLink href={removeBasePath(href)}>
      <a href={href} {...props} />
    </NextLink>
  );
};

export default LinkAdapter;
