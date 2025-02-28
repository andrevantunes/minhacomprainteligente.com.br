import type { ProductManagementListProps } from "./product-management-list.types";

import classNames from "classnames";
import { Card, Hr, Image, Button } from "@andrevantunes/andrevds";
import { toBrCurrency } from "@/helpers/currency.helper";
import { Title } from "@/components";
import { postBffApi } from "@/requests";
import Router from "next/router";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

const ProductManagementList = ({
  children,
  className,
  propertyProducts = [],
  propertyId,
  propertyHash,
  ...props
}: ProductManagementListProps) => {
  const cn = classNames("product-management-list", className);
  const propertyProductsState = sortPropertyProductsByDisponibility(propertyProducts);
  const propertyProductsMissing = filterPropertyProductsMissing(propertyProducts);

  const handleReplacementClick = async () => {
    const fp = await FingerprintJS.load();
    const { visitorId } = await fp.get();
    const propertyProducts = propertyProductsMissing.map((property) => ({
      productId: property.id,
      quantity: property.quantity,
      propertyId: propertyId,
    }));
    postBffApi("replacements", { fingerprint: visitorId, propertyProducts }).then((replacement) => {
      Router.push(`/dashboard/replacements/${replacement.id}`);
    });
  };

  const needReplacement = propertyProductsMissing.length > 0;
  return (
    <div className={cn} {...props}>
      {children}
      <div className="flex flex-column gap-1x">
        {needReplacement && (
          <>
            <section className="flex flex-column gap-1x">
              <div
                className={classNames({
                  "need-replacement": needReplacement,
                })}
              >
                <Title>Resumo</Title>
                <div>Os seguites produtos devem ser repostos neste imóvel:</div>
              </div>

              <div className={classNames("product-management-list__summary")}>
                <div className="flex flex-column gap-1x">
                  {propertyProductsMissing.map((product) => (
                    <Card
                      key={product.name}
                      elevation="md"
                      className={classNames("flex gap-1x missing-product")}
                    >
                      <div className="product-management-list__image-container">
                        <Image src={product.image} width={150} height={150} />
                      </div>
                      <div className="flex flex-column justify-content-center">
                        <div>
                          <div className="flex gap-1x">
                            <span>Nome do produto:</span>
                            <b>{product.name}</b>
                          </div>
                          <div className="flex gap-1x">
                            <span>Preço de venda neste imóvel:</span>
                            <b>{toBrCurrency(product.price)}</b>
                          </div>
                          <div className="flex gap-1x">
                            <span>Quantidade a ser reposta:</span>
                            <b>{product.quantity}</b>
                          </div>
                          <div className="flex gap-1x">
                            <span>Quantidade padrão no imóvel:</span>
                            <b>{product.expected_quantity}</b>
                          </div>
                          <div className="flex gap-1x">
                            <span>Quantidade atual no imóvel:</span>
                            <b>{product.current_quantity}</b>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>

              <Button onClick={handleReplacementClick}>Criar evento de reposição</Button>
            </section>
            <Hr />
          </>
        )}

        <section>
          <Title>Links úteis para o imóvel</Title>
          <div className="flex gap-1x">
            <Button variant="secondary" href={`/i/${propertyHash}`}>
              Acessar como hospede
            </Button>
            <Button variant="secondary" href={`/i/${propertyHash}/qrcode`}>
              Imprimir folha de QR Code
            </Button>
          </div>
        </section>

        <Hr />

        <section className="flex flex-column gap-1x">
          <Title>Administrar produtos no imóvel</Title>
          <p>
            Aqui você irá revisar quantidade esperada de cada produto no imóvel, assim como imagem e
            preço.
          </p>
          {propertyProductsState.map(({ product, ...propertyProduct }) => (
            <Card
              key={product.name}
              elevation="md"
              className={classNames("flex gap-1x align-items-center justify-content-between")}
            >
              <div className="product-management-list__image-container">
                <Image src={product.image} width={150} height={150} />
              </div>
              <div className="flex flex-column justify-content-center flex-grow">
                <div>
                  <div className="flex gap-1x">
                    <span>Nome do produto:</span>
                    <b>{product.name}</b>
                  </div>
                  <div className="flex gap-1x">
                    <span>Preço de venda neste imóvel:</span>
                    <b>{toBrCurrency(propertyProduct.price)}</b>
                  </div>
                  <div className="flex gap-1x">
                    <span>Quantidade esperada neste imóvel (máxima):</span>
                    <b>{propertyProduct.expected_quantity}</b>
                  </div>
                  <div className="flex gap-1x">
                    <span>Quantidade presente neste imóvel agora:</span>
                    <b
                      className={classNames({
                        "quantity-error":
                          propertyProduct.expected_quantity > propertyProduct.current_quantity,
                      })}
                    >
                      {propertyProduct.current_quantity}
                    </b>
                  </div>
                  <div className="flex gap-1x">
                    <span>Categoria deste produto no imóvel:</span>
                    <b>{propertyProduct.category}</b>
                  </div>
                </div>
              </div>
              <div>
                <Button variant="secondary" href={`/dashboard/products`}>
                  Editar
                </Button>
              </div>
            </Card>
          ))}
        </section>
      </div>
    </div>
  );
};

function sortPropertyProductsByDisponibility(propertyProducts: any[]) {
  if (!Array.isArray(propertyProducts)) {
    return [];
  }
  return [...propertyProducts].sort((a, b) => {
    const indexA = a.current_quantity / a.expected_quantity;
    const indexB = b.current_quantity / b.expected_quantity;
    return indexA > indexB ? 1 : -1;
  });
}

function filterPropertyProductsMissing(propertyProducts: any[] = []) {
  if (!Array.isArray(propertyProducts)) return [];
  return propertyProducts
    .filter(
      (propertyProduct) => propertyProduct.current_quantity < propertyProduct.expected_quantity
    )
    .map((propertyProduct) => {
      let quantity = 0;
      if (propertyProduct.current_quantity <= 0) {
        quantity = propertyProduct.expected_quantity;
      } else {
        quantity = propertyProduct.expected_quantity - propertyProduct.current_quantity;
      }
      return {
        id: propertyProduct.product.id,
        name: propertyProduct.product.name,
        quantity,
        image: propertyProduct.product.image,
        price: propertyProduct.price,
        category: propertyProduct.category,
      };
    });
}

export default ProductManagementList;
