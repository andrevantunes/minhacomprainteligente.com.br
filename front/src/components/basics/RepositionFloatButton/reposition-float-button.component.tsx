import type { RepositionFloatButtonProps } from "./reposition-float-button.types";

import classNames from "classnames";
import { StoreType, useStore } from "@/store";
import { Button, Icon } from "@andrevantunes/andrevds";

const RepositionFloatButton = ({
  children,
  className,
  href,
  size,
  type,
  ref,
  ...props
}: RepositionFloatButtonProps) => {
  const cn = classNames("cart-closer", className);
  const [{ properties }] = useStore(StoreType.Cart);
  if (!properties || properties.length <= 0) return null;
  const propertyIds = properties.map(({ id }) => id);
  const buttonHref = `${href}?propertyIds=` + propertyIds.join(",");
  return (
    <Button href={buttonHref} className={cn} {...props}>
      <div>
        <Icon name="loja-livros" color="white" size="md" />
        <span className="cart-closer__quantity">{properties.length}</span>
      </div>
      <div>Gerar reposição</div>
      <div />
    </Button>
  );
};

export default RepositionFloatButton;
