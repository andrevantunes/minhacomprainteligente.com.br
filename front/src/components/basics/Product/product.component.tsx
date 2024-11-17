import type { ProductProps } from "./product.types";

import classNames from "classnames";
import {Button, Card, Display} from "@andrevantunes/andrevds";
import {Title} from "@/components";
import {StoreType, useStore} from "@/store";
import {toBrCurrency, toCurrency} from "@/helpers/currency.helper";

`
    "className": "flex",
    "component": "div"
  },
  {
    "children": "R$6,00",
    "component": "Title"
  },
  {
    "href": "/desafio",
    "children": "Adicionar ao carrinho",
    "component": "Button"
  }
`

const Product = ({
  title,
  children,
  price,
  className,
  src,
  id,
  elevation = "hg",
  ...props
}: ProductProps) => {
  const cn = classNames("flex align-items-center flex-column", className);

  const [{ products }, setCart] = useStore(StoreType.Cart);
  const handleOnClick = (event: any) => {
    event.preventDefault();
    setCart({ products: [...products, { id, price, quantity: 1 }] });
  };
  return (
    <Card elevation={elevation} className={cn} {...props}>
      <Display size="sm">{title}</Display>
      <div style={{ gap: 8, flexGrow: 1, alignItems: "center", marginBottom: 16 }}>
        <img src={src} />
      </div>
      <Title>{toBrCurrency(price)}</Title>
      <Button onClick={handleOnClick}>Adicionar ao carrinho</Button>
    </Card>
  );
};

export default Product;
