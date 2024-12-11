import type { ProductListProps } from "./product-list.types";

import classNames from "classnames";
import { Label, TextField } from "@andrevantunes/andrevds";
import { Product, Grid } from "@/components";
import { useState } from "react";

const ProductList = ({ children, className, propertyProducts = [], ...props }: ProductListProps) => {
  const cn = classNames("product-list", className);
  const [propertyProductsState, setPropertyProductsState] = useState(propertyProducts);
  const categories = categoriesFromPropertyProducts(propertyProducts);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchKeyState, setSearchKeyState] = useState("");

  const handleChangeFilter = (event: any) => {
    const searchKey = event.target.value.toLowerCase();
    setSearchKeyState(searchKey);
    setPropertyProductsState(
      propertyProducts.filter((propertyProduct) =>
        propertyProductFilter(propertyProduct, searchKey, selectedCategory)
      )
    );
  };

  const handleCategoryClick = (event: any) => {
    const category = event.target.innerHTML;
    if (selectedCategory === category) setSelectedCategory("");
    else setSelectedCategory(category);

    setPropertyProductsState(
      propertyProducts.filter((propertyProduct) =>
        propertyProductFilter(propertyProduct, searchKeyState, category)
      )
    );
  };
  return (
    <div className={cn} {...props}>
      <div className="product-list__product-list-filters">
        <div className="mb-2x">
          <TextField
            id="product-filter"
            label="Pesquise pelo nome do produto ou categoria"
            onChange={handleChangeFilter}
          />
        </div>
        <div className="mb-2x flex gap-1x product-list__product-list-filters__categories">
          {categories.map((category) => {
            // @ts-ignore
            return (
              <Label
                onClick={handleCategoryClick}
                key={category}
                variant={(selectedCategory === category ? "primary" : "warning") as any}
              >
                {category}
              </Label>
            );
          })}
        </div>
      </div>

      <Grid
        style={{marginBottom: 60}}
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

function propertyProductFilter(propertyProduct: any, searchKey: string, category?: string) {
  if (category && propertyProduct.category !== category) return false;

  if (searchKey.length < 2) return true;
  const propertySearcher =
    `${propertyProduct.category} ${propertyProduct.product.name}`.toLowerCase();

  const words = searchKey.split(" ").map((word: string) => word.trim());

  return words.every((word: string) => propertySearcher.includes(word));
}

function categoriesFromPropertyProducts(propertyProducts: any[]) {
  const setter: any = new Set();
  propertyProducts.forEach((propertyProduct: any) => setter.add(propertyProduct.category));
  return [...setter.keys()];
}

export default ProductList;
