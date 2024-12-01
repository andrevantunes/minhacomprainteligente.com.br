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
  quantity,
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
        <Image
          width={120}
          height={120}
          src={src}
          className="checkout-product__image-name-label__image"
        />
        <div className="checkout-product__image-name-label__name-label">
          <span>{name}</span>
          <div>
            {labels.map((label: string) => (
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
          <TextField value={quantity} />
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
          {toBrCurrency(price * quantity)}
        </Display>
      </div>
    </Card>
  );
};

export default CheckoutProduct;
