import type { ReplacementListProps } from "./replacement-list.types";

import classNames from "classnames";
import { Card, Image, Label, LabelVariants } from "@andrevantunes/andrevds";
import { Button, Title } from "@/components";

const ReplacementList = ({
  children,
  className,
  propertyProducts,
  status,
  ...props
}: ReplacementListProps) => {
  const cn = classNames("replacement-list", className);
  const propertyProductsByPropertiesEntries = splitPropertyProductsByProperties(propertyProducts);
  return (
    <div className={cn} {...props}>
      {children}

      <div className={classNames("product-management-list__summary")}>
        <div className="flex align-items-center justify-content-end gap-1x">
          <div>Organizar por:</div>
          <Label>Imóvel</Label>
          <Label variant={LabelVariants.Warning}>Produto</Label>
        </div>
        <div className="flex flex-column gap-1x">
          {propertyProductsByPropertiesEntries?.map(([propertyName, propertyProducts]: any) => (
            <section className="flex flex-column gap-1x" key={propertyName}>
              <Title>{propertyName}</Title>
              <p>Produtos para serem repostos no imóvel: {propertyName}</p>
              {propertyProducts?.map((propertyProduct: any) => (
                <Card
                  key={propertyProduct.product.name}
                  elevation="md"
                  className={classNames("flex gap-1x missing-product")}
                >
                  <div className="product-management-list__image-container">
                    <Image
                      src={propertyProduct?.product?.image}
                      width={150}
                      height={150}
                      alt="product image"
                    />
                  </div>
                  <div className="flex flex-column justify-content-center">
                    <div>
                      <div className="flex gap-1x">
                        <span>Produto:</span>
                        <b>{propertyProduct.product.name}</b>
                      </div>
                      <div className="flex gap-1x">
                        <span>Quantidade a ser reposta:</span>
                        <b>{propertyProduct.quantity}</b>
                      </div>
                    </div>
                  </div>
                </Card>
              ))}
            </section>
          ))}
        </div>
        <div className="flex flex-column align-items-center justify-content-center gap-1x mt-3x">
          <div>Status atual: {status}</div>
          <Button>Marcar reposição para: em transporte</Button>
        </div>
      </div>
    </div>
  );
};

function splitPropertyProductsByProperties(propertyProducts?: any[]) {
  if (!Array.isArray(propertyProducts)) return ["", []];
  const properties: any = {};
  propertyProducts.forEach((propertyProduct: any) => {
    if (!properties[propertyProduct.property.name]) properties[propertyProduct.property.name] = [];
    properties[propertyProduct.property.name].push(propertyProduct);
  });
  return Object.entries(properties);
}

export default ReplacementList;
