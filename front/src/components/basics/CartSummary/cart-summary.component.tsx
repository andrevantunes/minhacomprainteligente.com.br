import type { CartSummaryProps } from "./cart-summary.types";

import classNames from "classnames";
import { CheckoutProduct } from "@/components";
import { StoreType, useStore } from "@/store";
import { useEffect, useState } from "react";
import { Button, Card, Display } from "@andrevantunes/andrevds";
import { toBrCurrency } from "@/helpers/currency.helper";
import { updateCartOnApi } from "@/requests";
import { notifyWarning } from "@/helpers/notify.helper";
import Router from "next/router";

const CartSummary = ({
  children,
  className,
  products,
  totalPrice,
  hash,
  billingTypes,
  ...props
}: CartSummaryProps) => {
  const cn = classNames("cart-summary", className);
  const [stateProducts, setStateProducts] = useState(
    typeof products === "object" ? products || [] : []
  );
  const [stateTotalPrice, setStateTotalPrice] = useState(totalPrice || 0);
  const [notified, setNotified] = useState(false);

  const [_cartHash, setCartByHash] = useStore(StoreType.Cart);
  useEffect(() => {
    setCartByHash({ byHash: { [hash]: { products, totalPrice } } });
  }, []);
  const handleIncreaseProduct = (productId: number | string) => {
    let totalPrice = 0;
    const stateProducts2 = stateProducts.map((product) => {
      let quantity = product.quantity;
      if (product.product_id == Number(productId)) quantity += 1;
      totalPrice += quantity * product.unity_price;
      return { ...product, quantity };
    });
    setStateTotalPrice(totalPrice);
    setStateProducts(stateProducts2);
    updateCartOnApi(hash, { products: stateProducts2 });
  };

  const handlePaymentClick = (event: any) => {
    const shouldNotify = stateProducts.some(
      (product) => product.currentQuantity - product.quantity < 0
    );
    const href = event.target.getAttribute("href");
    if (!notified && shouldNotify) {
      setNotified(true);
      event.preventDefault();
      event.stopPropagation();
      notifyWarning(
        "Confira se a quantidade dos produtos selecionados está presente antes de realizar o pagamento"
      );
      setTimeout(() => {
        Router.push(href);
      }, 8000);
    }
  };
  const handleDecreaseProduct = (productId: number | string) => {
    let totalPrice = 0;
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
    updateCartOnApi(hash, { products: stateProducts2 });
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
        {stateProducts?.map((product) => (
          <CheckoutProduct
            key={`product-${product.product_id}`}
            productId={product.product_id}
            src={product.image}
            name={product.name}
            price={product.unity_price}
            labels={[product.category]}
            saleQuantity={product.quantity}
            currentQuantity={product.currentQuantity}
            expectedQuantity={product.expectedQuantity}
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
            {billingTypes?.creditCard && (
              <Button onClick={handlePaymentClick} href={`/payment/${hash}/creditcard`}>
                Pagar com cartão de crédito
              </Button>
            )}
            {billingTypes?.pix && (
              <Button onClick={handlePaymentClick} href={`/payment/${hash}/pix`}>
                Pagar com PIX
              </Button>
            )}
            {billingTypes?.paypal && (
              <Button onClick={handlePaymentClick} href={`/payment/${hash}/paypal`}>
                Pagar com PayPal (internacional)
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default CartSummary;
