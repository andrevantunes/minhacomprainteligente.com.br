import { ToggleButton as MarsToggleButton, ToggleButtonProps } from "@andrevantunes/andrevds";
import NextLink from "next/link";
import { removeBasePath, isExternalLink } from "@/helpers/links.helpers";

const ToggleButton = ({ href, ...props }: ToggleButtonProps) => {
  if (!href || isExternalLink(href)) {
    return <MarsToggleButton href={href} {...props} />;
  }
  return (
    <NextLink href={removeBasePath(href)}>
      <MarsToggleButton as={"a"} href={href} {...props} />
    </NextLink>
  );
};

export default ToggleButton;
