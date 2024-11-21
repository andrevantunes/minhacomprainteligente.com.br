import type { CartCloserProps } from "./cart-closer.types";

import classNames from "classnames";
import { StoreType, useStore } from "@/store";
import { toBrCurrency } from "@/helpers/currency.helper";
import { Button, Icon } from "@andrevantunes/andrevds";

const CartCloser = ({ children, className, size, type, href, ref, ...props }: CartCloserProps) => {
  const cn = classNames("cart-closer", className);
  const [{ products }] = useStore(StoreType.Cart);
  if (!products || products.length <= 0) return null;
  return (
    <Button href={href} className={cn} {...props}>
      <div>
        <Icon name="loja-livros" color="white" size="md" />
        <span className="cart-closer__quantity">{calculateCartTotalQuantity(products)}</span>
      </div>
      <div>Continuar</div>
      <div>{toBrCurrency(calculateCartValue(products))}</div>
    </Button>
  );
};
function calculateCartValue(products: any[]) {
  return products.reduce((acc, product) => {
    return acc + product.quantity * product.price;
  }, 0);
}
function calculateCartTotalQuantity(products: any[]) {
  return products.reduce((acc, product) => {
    return acc + product.quantity;
  }, 0);
}

export default CartCloser;
