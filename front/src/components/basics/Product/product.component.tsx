import type { ProductProps } from "./product.types";

import classNames from "classnames";
import {Button, Card, Display} from "@andrevantunes/andrevds";
import {Title} from "@/components";

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

const Product = ({ title, children, price, className, src, elevation = "hg", ...props }: ProductProps) => {
  const cn = classNames("flex align-items-center flex-column", className);
  return (
    <Card elevation={elevation} className={cn} {...props}>
      <Display size="sm">{title}</Display>
      <div style={{ gap: 8, flexGrow: 1, alignItems: "center", marginBottom: 16 }}>
        <img src={src} />
      </div>
      <Title>{price}</Title>
      <Button>Adicionar ao carrinho</Button>
    </Card>
  );
};

export default Product;
