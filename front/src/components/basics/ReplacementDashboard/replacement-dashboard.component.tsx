import type { ReplacementDashboardProps } from "./replacement-dashboard.types";

import classNames from "classnames";
import { ItemElement } from "@andrevantunes/andrevds";
import { Link } from "@/components";

const ReplacementDashboard = ({
  children,
  className,
  replacements,
  ...props
}: ReplacementDashboardProps) => {
  const cn = classNames(
    "replacement-dashboard flex flex-column align-items-stretch gap-1x",
    className
  );
  return (
    <div className={cn} {...props}>
      {replacements?.map(({ id, status, replacement_property_products }: any) => (
        <Link
          href={`/dashboard/replacements/${id}`}
          key={`/dashboard/replacements/${id}`}
          style={{ display: "block" }}
        >
          <ItemElement>
            <div>
              <span>Status: </span>
              <b>{status}</b>
            </div>
            {replacement_property_products?.map((propertyProduct: any) => (
              <div key={propertyProduct.id}>
                <div>
                  <span>Propriedade:</span>
                  <b>{propertyProduct.property.name}</b>
                </div>
                <div>
                  <span>Produto:</span>
                  <b>
                    {propertyProduct.quantity}x {propertyProduct.product.name}
                  </b>
                </div>
              </div>
            ))}
          </ItemElement>
        </Link>
      ))}
    </div>
  );
};

export default ReplacementDashboard;
