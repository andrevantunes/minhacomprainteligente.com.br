import type { CartCloserProps } from "./cart-closer.types";

import classNames from "classnames";
import { StoreType, useStore } from "@/store";
import {toBrCurrency} from "@/helpers/currency.helper";

const CartCloser = ({ children, className, ...props }: CartCloserProps) => {
  const cn = classNames("cart-closer", className);
  const [{ products }] = useStore(StoreType.Cart);
  if (!products || products.length <= 0) return null;
  return (
    <div className={cn} {...props}>
      <span>Fechar pedido</span>
      <span>{toBrCurrency(calculateCartValue(products))}</span>
    </div>
  );
};
function calculateCartValue(products: any[]){
  return products.reduce((acc, product) => {
    return acc + product.quantity * product.price;
  }, 0);
}

export default CartCloser;
