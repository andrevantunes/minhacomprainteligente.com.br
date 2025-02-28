import type { ProductListProps } from "./product-list.types";

import classNames from "classnames";
import { Label, TextField, Hr, Text } from "@andrevantunes/andrevds";
import { Product, Grid, Title } from "@/components";
import { useEffect, useState } from "react";

const ProductList = ({
  children,
  className,
  propertyProducts = [],
  buttonLabel,
  ...props
}: ProductListProps) => {
  const cn = classNames("product-list", className);
  const [propertyProductsState, setPropertyProductsState] = useState(
    Array.isArray(propertyProducts) ? propertyProducts : []
  );
  const categories = categoriesFromPropertyProducts(
    Array.isArray(propertyProducts) ? propertyProducts : []
  );
  const [selectedCategory, setSelectedCategory] = useState("");
  const [searchKeyState, setSearchKeyState] = useState("");
  const [showOtherProducts, setShowOtherProducts] = useState(false);
  const [showEmptyMessage, setEmptyMessage] = useState(false);

  useEffect(() => {
    const filteredCategory = new URLSearchParams(location.search).get("category");
    if (filteredCategory) {
      setSelectedCategory(filteredCategory.toLowerCase());
      const newProductList = propertyProducts.map(
        propertyProductFilter("", filteredCategory.toLowerCase())
      );
      setPropertyProductsState(newProductList);
      setShowOtherProducts(!newProductList.every(({ filtered }: any) => filtered));
      setEmptyMessage(!newProductList.some(({ filtered }: any) => filtered));
    } else {
      setSelectedCategory("");
      setPropertyProductsState(propertyProducts?.map(propertyProductFilter("", "")));
      setShowOtherProducts(false);
      setEmptyMessage(false);
    }
  }, []);

  const updateFilter = (searchKey: string) => {
    setSearchKeyState(searchKey);
    const newProductList = propertyProducts.map(propertyProductFilter(searchKey, selectedCategory));
    setPropertyProductsState(newProductList);
    setShowOtherProducts(!newProductList.every(({ filtered }: any) => filtered));
    setEmptyMessage(!newProductList.some(({ filtered }: any) => filtered));
  };

  const handleChangeFilter = (event: any) => {
    const searchKey = event.target.value.toLowerCase();
    updateFilter(searchKey);
  };

  const handleCategoryClick = (event: any) => {
    let category = event.target.innerHTML.toLowerCase();
    let newProductList = [];
    if (selectedCategory.toLowerCase() === category) {
      category = "";
    }
    setSelectedCategory(category);
    newProductList = propertyProducts.map(
      propertyProductFilter(searchKeyState.toLowerCase(), category)
    );
    setPropertyProductsState(newProductList);
    setShowOtherProducts(!newProductList.every(({ filtered }: any) => filtered));
    setEmptyMessage(!newProductList.some(({ filtered }: any) => filtered));
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
                variant={
                  (selectedCategory.toLowerCase() === category.toLowerCase()
                    ? "primary"
                    : "warning") as any
                }
              >
                {category}
              </Label>
            );
          })}
        </div>
      </div>
      <Title>Produtos</Title>
      {showEmptyMessage && <Text>Nenhum produto encontrado para os filtros selecionados</Text>}
      <Grid
        style={{ marginBottom: 60 }}
        columns={{
          md: [1, 1, 1],
          sm: [1, 1],
          xs: [1],
        }}
      >
        {propertyProductsState
          .filter(({ filtered }) => filtered)
          .map((propertiesProduct) => (
            <Product
              buttonLabel={buttonLabel}
              src={propertiesProduct.product.image}
              category={propertiesProduct.category}
              price={propertiesProduct.price}
              title={propertiesProduct.product.name}
              productId={propertiesProduct.product.id}
              key={propertiesProduct.product.id}
            />
          ))}
      </Grid>

      {showOtherProducts && (
        <>
          <Hr />
          <Title>Outros produtos</Title>
          <Grid
            style={{ marginBottom: 60 }}
            columns={{
              md: [1, 1, 1],
              sm: [1, 1],
              xs: [1],
            }}
          >
            {propertyProductsState
              .filter(({ filtered }) => filtered === false)
              .map((propertiesProduct) => (
                <Product
                  buttonLabel={buttonLabel}
                  src={propertiesProduct.product.image}
                  category={propertiesProduct.category}
                  price={propertiesProduct.price}
                  title={propertiesProduct.product.name}
                  productId={propertiesProduct.product.id}
                  key={propertiesProduct.product.id}
                />
              ))}
          </Grid>
        </>
      )}
    </div>
  );
};

function propertyProductFilter(searchKey: string, category?: string): any {
  return (propertyProduct: any) => {
    if (category && propertyProduct.category.toLowerCase() !== category)
      return { ...propertyProduct, filtered: false };

    if (searchKey.length < 2) return { ...propertyProduct, filtered: true };
    const propertySearcher =
      `${propertyProduct.category} ${propertyProduct.product.name}`.toLowerCase();

    const words = searchKey.split(" ").map((word: string) => word.trim());

    return {
      ...propertyProduct,
      filtered: words.every((word: string) => propertySearcher.includes(word)),
    };
  };
}

function categoriesFromPropertyProducts(propertyProducts: any[]) {
  if (!Array.isArray(propertyProducts)) return [];
  const setter: any = new Set();
  propertyProducts.forEach((propertyProduct: any) => setter.add(propertyProduct.category));
  return [...setter.keys()];
}

export default ProductList;
