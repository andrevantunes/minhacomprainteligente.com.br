import type { ProductProps } from "./product.types";

import classNames from "classnames";
import { Button, Card, Display } from "@andrevantunes/andrevds";
import { Title } from "@/components";
import { StoreType, useStore } from "@/store";
import { toBrCurrency } from "@/helpers/currency.helper";

const Product = ({
  title,
  children,
  price,
  className,
  src,
  id,
  elevation = "hg",
  displayAs = "h2",
  ...props
}: ProductProps) => {
  const cn = classNames("flex align-items-center flex-column", className);

  const [{ products }, setCart] = useStore(StoreType.Cart);
  const handleOnClick = (event: any) => {
    event.preventDefault();
    // @ts-ignore
    setCart({ products: [...products, { id, price, quantity: 1 }] });
  };
  return (
    <Card elevation={elevation} className={cn} {...props}>
      <Title as={displayAs} size="sm">
        {title}
      </Title>
      <div className="flex-fill flex align-items-center gap-1x mb-1x">
        <img src={src} alt="Product Image" />
      </div>
      <Title className="mb-1x">{toBrCurrency(Number(price))}</Title>
      <Button onClick={handleOnClick}>Adicionar ao carrinho</Button>
    </Card>
  );
};

export default Product;
