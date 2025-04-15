import type { ProductEditProps } from "./product-edit.types";

import classNames from "classnames";
import { useEffect, useState } from "react";
import { getBffApi } from "@/requests";
import { Card, Hr, TextField } from "@andrevantunes/andrevds";
import { Button, PropertyProduct, Title } from "@/components";
import FileInput from "../FileInput/file-input.component";

const ProductEdit = ({ children, className, id = 13, ...props }: ProductEditProps) => {
  const cn = classNames("product-edit", className);
  const [product, setProduct] = useState({} as any);
  const [properties, setProperties] = useState([] as any[]);
  useEffect(() => {
    getBffApi(`products/${id}}`).then((res) => {
      setProduct(res.product);
    });
    getBffApi(`products/${id}/properties`).then((res) => {
      console.log(res);
      setProperties(res.product?.properties_products);
    });
  }, []);
  return (
    <div className={cn} {...props}>
      <Card>
        <form className="flex flex-column gap-1x">
          <FileInput name="image" image={product?.image} />
          <div>
            <TextField name="name" label="Nome" value={product?.name} />
          </div>
          <div>
            <Button>Salvar</Button>
          </div>
        </form>
      </Card>
      <Hr />
      <Title>Imóveis</Title>
      <div className="fle flex-column gap-1x">
        {properties?.map((productProperty) => (
          <PropertyProduct
            name={productProperty.property.name}
            expected_quantity={productProperty.expected_quantity}
            price={productProperty.price}
            current_quantity={productProperty.current_quantity}
            image={productProperty.property.image}
            nameLabel="Imóvel"
          >
            <Button
              href={`/dashboard/property-product/${productProperty.property.hash}/${id}}`}
              variant="secondary"
            >
              Editar este imóvel
            </Button>
            <Button href={`/dashboard/properties/${productProperty.property.hash}`}>
              Editar vínculo
            </Button>
          </PropertyProduct>
        ))}
      </div>
    </div>
  );
};

export default ProductEdit;
