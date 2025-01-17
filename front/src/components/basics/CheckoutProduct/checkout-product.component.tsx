import type { CheckoutProductProps } from "./checkout-product.types";

import classNames from "classnames";
import { Button, Card, Display, Label, TextField, Image } from "@andrevantunes/andrevds";
import { toBrCurrency } from "@/helpers/currency.helper";

const CheckoutProduct = ({
  children,
  className,
  src,
  name,
  price,
  productId,
  labels = [],
  saleQuantity,
  currentQuantity,
  expectedQuantity,
  onIncrease = () => {},
  onDecrease = () => {},
  ...props
}: CheckoutProductProps) => {
  const cn = classNames("checkout-product", className);
  return (
    <Card
      style={{
        gap: 16,
        display: "flex",
        alignItems: "center",
      }}
      className={cn}
      {...props}
    >
      <div className="checkout-product__image-name-label">
        <div className="checkout-product__image-container">
          <Image
            width={120}
            height={120}
            src={src}
            className="checkout-product__image-name-label__image"
          />
        </div>
        <div className="checkout-product__image-name-label__name-label">
          <label
            title={`Esperado que ainda tenha ${currentQuantity} (do total de ${expectedQuantity}) unidades deste produto presentes no imóvel`}
          >
            <b>{name}</b>
          </label>
          <div>
            {labels?.map((label: string) => (
              <Label key={label}>{label}</Label>
            ))}
          </div>
        </div>
      </div>
      <div className="checkout-product__price-quantity-subtotal">
        <Display
          style={{
            width: 90,
            fontSize: "1.2em",
            textAlign: "center",
          }}
        >
          {toBrCurrency(price)}
        </Display>
        <div
          style={{
            width: 100,
            display: "flex",
            fontSize: "1.2em",
            textAlign: "center",
          }}
        >
          <Button
            style={{
              padding: 8,
            }}
            onClick={() => onDecrease(productId)}
          >
            -
          </Button>
          <TextField value={saleQuantity} />
          <Button
            style={{
              padding: 8,
            }}
            onClick={() => onIncrease(productId)}
          >
            +
          </Button>
        </div>
        <Display
          style={{
            width: 90,
            fontSize: "1.2em",
            textAlign: "center",
          }}
        >
          {toBrCurrency(price * saleQuantity)}
        </Display>
      </div>
    </Card>
  );
};

export default CheckoutProduct;
