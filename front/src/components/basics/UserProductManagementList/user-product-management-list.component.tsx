import type { UserProductManagementListProps } from "./user-product-management-list.types";

import classNames from "classnames";
import { useEffect, useState } from "react";
import { getBffApi } from "@/requests";
import { Button, PropertyProduct } from "@/components";

const UserProductManagementList = ({
  children,
  className,
  ...props
}: UserProductManagementListProps) => {
  const cn = classNames("user-product-management-list flex flex-column gap-1x", className);
  const [products, setProducts] = useState([] as any[]);
  useEffect(() => {
    getBffApi("products").then((res) => {
      setProducts(res?.products);
    });
  }, []);
  return (
    <div className={cn} {...props}>
      <div className="flex justify-content-end gap-1x">
        <Button>Adicionar um produto ao sistema</Button>
      </div>
      <div className="flex flex-column gap-1x">
        {products.map((product) => (
          <PropertyProduct key={product.bame} {...product}>
            <div className="flex gap-1x">
              <Button href={`/dashboard/products/${product.id}`}>Editar produto</Button>
              <Button>Vincular este produto a um imóvel</Button>
            </div>
          </PropertyProduct>
        ))}
      </div>
    </div>
  );
};

export default UserProductManagementList;
