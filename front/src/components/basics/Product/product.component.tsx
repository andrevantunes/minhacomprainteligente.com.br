import type { ProductProps } from "./product.types";

import classNames from "classnames";
import { Button, Card } from "@andrevantunes/andrevds";
import { Title } from "@/components";
import { StoreType, useStore } from "@/store";
import { toBrCurrency } from "@/helpers/currency.helper";

const upsertProduct = (products: any = [], productId: string | number, price: number) => {
  const product = products.find((p: any) => p.productId == Number(productId));
  if (product) {
    product.quantity += 1;
    return [...products];
  }
  return [...products, { productId: Number(productId), price, quantity: 1 }];
};
const Product = ({
  title,
  children,
  price,
  className,
  src,
  productId,
  elevation = "hg",
  displayAs = "h2",
  ...props
}: ProductProps) => {
  const cn = classNames("flex align-items-center flex-column product", className);

  const [{ products }, setCart] = useStore(StoreType.Cart);
  const handleOnClick = (event: any) => {
    event.preventDefault();
    //TODO gerenciar quantity
    // @ts-ignore
    setCart({ products: upsertProduct(products, productId, price) });
  };
  return (
    <Card elevation={elevation} className={cn} {...props}>
      <Title as={displayAs} size="sm">
        {title}
      </Title>
      <div className="flex-fill flex align-items-center gap-1x mb-1x">
        <img src={src} alt="Product Image" className="product__image" />
      </div>
      <Title className="mb-1x">{toBrCurrency(price)}</Title>
      <Button onClick={handleOnClick}>Adicionar ao carrinho</Button>
    </Card>
  );
};

export default Product;
