import type { PropertyProductProps } from "./property-product.types";

import classNames from "classnames";
import { Card, Image } from "@andrevantunes/andrevds";
import { toBrCurrency } from "@/helpers/currency.helper";

const PropertyProduct = ({
  name,
  nameLabel = "Nome do produto",
  image,
  price,
  quantity,
  expected_quantity,
  current_quantity,
  className,
  children,
  ...props
}: PropertyProductProps) => {
  const cn = classNames("property-product", className);
  return (
    <Card elevation="md" className={classNames("flex gap-1x missing-product")} {...props}>
      <div className="product-management-list__image-container">
        <Image src={image} width={150} height={150} />
      </div>
      <div className="flex flex-column justify-content-center">
        <div>
          <div className="flex gap-1x">
            <span>{nameLabel}:</span>
            <b>{name}</b>
          </div>
          {price && (
            <div className="flex gap-1x">
              <span>Preço de venda neste imóvel:</span>
              <b>{toBrCurrency(price)}</b>
            </div>
          )}
          {quantity && (
            <div className="flex gap-1x">
              <span>Quantidade a ser reposta:</span>
              <b>{quantity}</b>
            </div>
          )}
          {expected_quantity && (
            <div className="flex gap-1x">
              <span>Quantidade padrão no imóvel:</span>
              <b>{expected_quantity}</b>
            </div>
          )}
          {typeof current_quantity == "number" && (
            <div className="flex gap-1x">
              <span>Quantidade atual no imóvel:</span>
              <b>{current_quantity}</b>
            </div>
          )}
          {children}
        </div>
      </div>
    </Card>
  );
};

export default PropertyProduct;
