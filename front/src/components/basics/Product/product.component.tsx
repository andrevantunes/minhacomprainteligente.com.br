import type { ProductProps } from "./product.types";

import classNames from "classnames";
import {Button, Card, Display} from "@andrevantunes/andrevds";
import {Title} from "@/components";
import {StoreType, useStore} from "@/store";

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
  const handleOnClick = (event) => {
    event.preventDefault();
    setCart({ products: [...products, id] });
  }
  return (
    <Card elevation={elevation} className={cn} {...props}>
      <Display size="sm">{title}</Display>
      <div style={{ gap: 8, flexGrow: 1, alignItems: "center", marginBottom: 16 }}>
        <img src={src} />
      </div>
      <Title>{price}</Title>
      <Button onClick={handleOnClick}>Adicionar ao carrinho</Button>
    </Card>
  );
};

export default Product;
