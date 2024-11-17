import type { ItemButtonProps } from "@andrevantunes/andrevds";
import { removeBasePath } from "@/helpers/links.helpers";
import { ItemButton as MarsItemButton } from "@andrevantunes/andrevds";
import NextLink from "next/link";

const ItemButton = ({ href, ...props }: ItemButtonProps) => {
  if (!href || href.startsWith("http")) {
    return <MarsItemButton href={href} {...props} />;
  }
  return (
    <NextLink href={removeBasePath(href)}>
      <MarsItemButton as="a" href={href} {...props} />
    </NextLink>
  );
};

export default ItemButton;
