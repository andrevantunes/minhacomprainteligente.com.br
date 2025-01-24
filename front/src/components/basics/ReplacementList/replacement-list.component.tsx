import type { ReplacementListProps } from "./replacement-list.types";

import classNames from "classnames";
import { Card, Image, ItemElement, Label, LabelVariants, Text } from "@andrevantunes/andrevds";
import { Button, Title } from "@/components";
import { useState } from "react";
import { putBffApi } from "@/requests";

const replacementStatuses: any = {
  pt: {
    processing: {
      label: "Em processamento",
      howTo:
        "Separe os produtos no estoque para transporte, separe caixas e/ou sacolas, já organizamos todos os produtos pela quantidade que você vai precisar para cada um deles, não se preocupe pois na próxima etapa iremos apresentar para você os produtos organizados por imóvel para você saber quantos produtos deve deixar em cada imóvel",
      nextStep: "separated_for_replacement",
    },
    separated_for_replacement: {
      label: "Separado para reposição",
      howTo:
        "Leve os produtos para o veículo, organizados aqui os produtos por imóvel, assim você pode visualizar de forma rápida quantos produtos deve deixar em cada imóvel.",
      nextStep: "in_transit",
    },
    in_transit: {
      label: "Em transito",
      howTo:
        "Este status é para você melhor lembrar que está com produtos separados no carro, prontos para entrega, organizados aqui os produtos por imóvel, assim você pode visualizar de forma rápida quantos produtos deve deixar em cada imóvel.",
      nextStep: "delivered",
    },
    delivered: {
      label: "Entregue",
      howTo:
        "Tudo certo! Adicionamos novamente a quantidade de produtos a contabilização de produtos existentes no imóvel, agora seus clientes poderão comprar novamente esses produtos e você será avisado assim que houver uma venda.",
    },
    cancelled: {
      label: "Cancelada",
      howTo: "A reposição destes produtos foi cancelada.",
      nextStep: "returned",
    },
    returned: {
      label: "Retornado ao estoque",
      howTo: "Os produtos foram entregues de volta ao estoque.",
    },
  },
};

const ReplacementList = ({
  replacementId,
  children,
  className,
  propertyProducts,
  status = "",
  ...props
}: ReplacementListProps) => {
  const cn = classNames("replacement-list", className);
  const [statusState, setStatusState] = useState(status);
  const [viewMode, setViewMode] = useState(statusState == "processing" ? "products" : "properties");
  const propertyProductsByPropertiesEntries = splitPropertyProductsByProperties(propertyProducts);
  const propertyProductsByProducts = splitPropertyProductsByProducts(propertyProducts);
  const handleOnNextStep = async () => {
    setViewMode("properties");
    const nextStep = replacementStatuses.pt[statusState]?.nextStep;
    await putBffApi(`replacements/${replacementId}`, { status: nextStep });
    setStatusState(nextStep);
  };
  return (
    <div className={cn} {...props}>
      {children}

      <div className={classNames("product-management-list__summary")}>
        <div className="flex align-items-center justify-content-end gap-1x mb-1x">
          <div>Organizar por:</div>
          <Label
            variant={viewMode === "properties" ? LabelVariants.Primary : LabelVariants.Warning}
          >
            Imóvel
          </Label>
          <Label variant={viewMode === "products" ? LabelVariants.Primary : LabelVariants.Warning}>
            Produto
          </Label>
        </div>
        {viewMode === "products" && (
          <section className="flex flex-column gap-1x">
            {propertyProductsByProducts?.map((propertyProduct: any) => (
              <Card
                key={propertyProduct.name}
                elevation="md"
                className={classNames("flex gap-1x missing-product")}
              >
                <div className="product-management-list__image-container">
                  <Image src={propertyProduct.image} width={150} height={150} alt="product image" />
                </div>
                <div className="flex flex-column justify-content-center">
                  <div>
                    <div className="flex gap-1x">
                      <span>Produto:</span>
                      <b>{propertyProduct.name}</b>
                    </div>
                    <div className="flex gap-1x">
                      <span>Quantidade a ser reposta:</span>
                      <b>{propertyProduct.quantity}</b>
                    </div>
                    <div className="flex gap-1x flex-column">
                      <span>Propriedades:</span>
                      <ul style={{ margin: 0 }}>
                        {propertyProduct.properties?.map((property: any) => (
                          <li key={property}>{property}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </Card>
            ))}
          </section>
        )}
        {viewMode === "properties" && (
          <ItemElement className="flex flex-column gap-1x">
            {propertyProductsByPropertiesEntries?.map(([propertyName, propertyProducts]: any) => (
              <section className="flex flex-column gap-1x" key={propertyName}>
                <Text>Produtos para serem repostos no imóvel:</Text>
                <Title>{propertyName}</Title>
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
          </ItemElement>
        )}

        {status && replacementStatuses.pt[statusState] && (
          <div className="flex flex-column align-items-center justify-content-center gap-1x mt-3x">
            {replacementStatuses.pt[replacementStatuses.pt[statusState].nextStep] && (
              <Button onClick={handleOnNextStep}>
                Marcar reposição para:{" "}
                {replacementStatuses.pt[replacementStatuses.pt[statusState].nextStep].label}
              </Button>
            )}
            <div className="flex flex-column align-items-center justify-content-center gap-1x mt-3x">
              <div>
                Status atual: <b>{replacementStatuses.pt[statusState].label}</b>
              </div>
              <Card>
                <h4>O que fazer nessa etapa:</h4>
                <p>{replacementStatuses.pt[statusState].howTo}</p>
              </Card>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

function splitPropertyProductsByProducts(propertyProducts?: any[]) {
  if (!Array.isArray(propertyProducts)) return [];
  const products: any = {};
  propertyProducts.forEach((propertyProduct: any) => {
    if (!products[propertyProduct.product.name])
      products[propertyProduct.product.name] = {
        name: propertyProduct.product.name,
        image: propertyProduct.product.image,
        quantity: propertyProduct.quantity,
        properties: [propertyProduct.property.name],
      };
    else {
      products[propertyProduct.product.name].quantity += propertyProduct.quantity;
      products[propertyProduct.product.name].properties.push(propertyProduct.property.name);
    }
  });
  return Object.values(products);
}

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
