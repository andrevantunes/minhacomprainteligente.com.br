import type { CartCloserProps } from "./cart-closer.types";

import classNames from "classnames";
import { StoreType, useStore } from "@/store";
import { toBrCurrency } from "@/helpers/currency.helper";
import { Button, Icon } from "@andrevantunes/andrevds";
import { postBffApi } from "@/requests";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import Router from "next/router";

const CartCloser = ({
  children,
  className,
  size,
  type,
  href,
  ref,
  propertyId,
  ...props
}: CartCloserProps) => {
  const cn = classNames("cart-closer", className);
  const [{ products }] = useStore(StoreType.Cart);
  if (!products || products.length <= 0) return null;

  const handleClick = async () => {
    const fp = await FingerprintJS.load();
    const { visitorId } = await fp.get();
    const hash = String(new Date().getTime());
    postBffApi("carts", { products, fingerprint: visitorId, propertyId, hash })
      .then((cart) => {
        Router.push(`/payment/${cart.hash}`);
      })
      .catch((e) => console.log(e));
  };

  return (
    <Button onClick={handleClick} className={cn} {...props}>
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
