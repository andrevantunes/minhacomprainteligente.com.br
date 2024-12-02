import type { ProductListProps } from "./product-list.types";

import classNames from "classnames";
import { TextField } from "@andrevantunes/andrevds";
import { Product, Grid } from "@/components";
import { useState } from "react";

const ProductList = ({ children, className, propertyProducts, ...props }: ProductListProps) => {
  const cn = classNames("product-list", className);
  const [propertyProductsState, setPropertyProductsState] = useState(propertyProducts);
  const handleChangeFilter = (event: any) => {
    const searchKey = event.target.value.toLowerCase();
    setPropertyProductsState(
      propertyProducts.filter((propertyProduct) =>
        propertyProductFilter(propertyProduct, searchKey)
      )
    );
  };
  return (
    <div className={cn} {...props}>
      <div className="mb-2x">
        <TextField
          label="Pesquise pelo nome do produto ou categoria"
          onChange={handleChangeFilter}
        />
      </div>
      <Grid
        style={{ marginBottom: 60 }}
        columns={{
          md: [1, 1, 1],
          sm: [1, 1],
          xs: [1],
        }}
      >
        {propertyProductsState.map((propertiesProduct) => (
          <Product
            src={propertiesProduct.product.image}
            category={propertiesProduct.category}
            price={propertiesProduct.price}
            title={propertiesProduct.product.name}
            productId={propertiesProduct.product.id}
            key={propertiesProduct.product.id}
          />
        ))}
      </Grid>
    </div>
  );
};

function propertyProductFilter(propertyProduct: any, searchKey: string) {
  if (searchKey.length < 2) return true;
  const propertySearcher =
    `${propertyProduct.category} ${propertyProduct.product.name}`.toLowerCase();

  const words = searchKey.split(" ").map((word: string) => word.trim());

  return words.some((word: string) => propertySearcher.includes(word));
}

export default ProductList;
