import type { CartSummaryProps } from "./cart-summary.types";

import classNames from "classnames";
import { CheckoutProduct } from "@/components";
import { StoreType, useStore } from "@/store";
import { useEffect, useState } from "react";
import { Button, Card, Display } from "@andrevantunes/andrevds";
import { toBrCurrency } from "@/helpers/currency.helper";

const CartSummary = ({
  children,
  className,
  products,
  totalPrice,
  hash,
  ...props
}: CartSummaryProps) => {
  const cn = classNames("cart-summary", className);
  const [stateProducts, setStateProducts] = useState(products || []);
  const [stateTotalPrice, setStateTotalPrice] = useState(totalPrice || 0);

  const [{ byHash }, setCartByHash] = useStore(StoreType.Cart);
  useEffect(() => {
    setCartByHash({ byHash: { [hash]: { products, totalPrice } } });
    console.log({byHash})//TODO adicionar ao sessionStorage
  }, []);
  const handleIncreaseProduct = (productId) => {
    const totalPrice = 0;
    const stateProducts2 = stateProducts.map((product) => {
      let quantity = product.quantity;
      if (product.product_id == Number(productId)) quantity += 1;
      totalPrice += quantity * product.unity_price;
      return { ...product, quantity };
    });
    setStateTotalPrice(totalPrice);
    setStateProducts(stateProducts2);
  };
  const handleDecreaseProduct = (productId) => {
    const totalPrice = 0;
    const stateProducts2 = stateProducts
      .map((product) => {
        let quantity = product.quantity;
        if (product.product_id == Number(productId)) quantity -= 1;
        totalPrice += quantity * product.unity_price;
        return { ...product, quantity };
      })
      .filter((product) => product.quantity > 0);
    setStateProducts(stateProducts2);
    setStateTotalPrice(totalPrice);
  };
  return (
    <div className={cn} {...props}>
      <div
        style={{
          gap: 16,
          display: "flex",
          flexDirection: "column",
        }}
      >
        {stateProducts.map((product) => (
          <CheckoutProduct
            key={`product-${product.product_id}`}
            productId={product.product_id}
            src={product.image}
            name={product.name}
            price={product.unity_price}
            labels={["Bebidas"]}
            quantity={product.quantity}
            onIncrease={handleIncreaseProduct}
            onDecrease={handleDecreaseProduct}
            elevation="md"
          />
        ))}
        <Card elevation="md" {...props}>
          <Display className="text-center">Resumo do pedido</Display>
          <div
            style={{
              margin: "16px 0",
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <Display>Total</Display>
            <Display>{toBrCurrency(stateTotalPrice)}</Display>
          </div>
          <div
            style={{
              gap: 8,
              width: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <Button href="/carrinho/cartao">Pagar com cartão de crédito</Button>
            <Button href="/carrinho/pix">Pagar com PIX</Button>
            <Button href="/carrinho/paypal">Pagar com PayPal (internacional)</Button>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CartSummary;
