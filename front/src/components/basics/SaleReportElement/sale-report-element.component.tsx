import type { SaleReportElementProps } from "./sale-report-element.types";

import classNames from "classnames";
import { Icon, ItemElement, Label, LabelVariants } from "@andrevantunes/andrevds";
import { Title } from "@/components";
import { toBrCurrency } from "@/helpers/currency.helper";
import { toBrDateTime } from "@/helpers/datetime.helper";

const SaleReportElement = ({
  children,
  className,
  paymentMethod,
  iconName,
  propertyName,
  amount,
  status = "",
  createdAt,
  products,
  hash,
  name,
  ...props
}: SaleReportElementProps) => {
  const cn = classNames("sale-report-element", className);
  const paid = ["paid", "confirmed"].includes(status);
  // @ts-ignore
  return (
    <ItemElement size={"md" as any} className={cn} {...props}>
      {paymentMethod === "credit_card" && (
        <div className="flex flex-column align-items-center">
          <Icon name="credit-card" />
          <small>Crédito</small>
        </div>
      )}
      {paymentMethod === "pix" && (
        <div className="flex flex-column align-items-center">
          <Icon name="pix" />
          <small>PIX</small>
        </div>
      )}

      {hash && (
        <div className="flex-grow">
          <Title>{propertyName}</Title>
          <div className="flex-grow">
            <span>Identificador da venda:</span>
            <b> {hash}</b>
          </div>
          <div>
            <small>
              {toBrDateTime(createdAt as string)} - {name}
            </small>
            <div className="flex flex-column">
              {products?.map((product) => (
                <small key={product.name}>
                  {product.quantity}x {product.name}
                </small>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="sale-report-element__amount flex flex-column justify-content-center align-items-center">
        <Title
          className={classNames({
            "sale-report-element__amount__success": paid,
            "sale-report-element__amount__canceled": !paid && status != "pending",
            "sale-report-element__amount__pending": !paid && status == "pending",
          })}
        >
          {toBrCurrency(amount as string)}
        </Title>
        {paid && <Label variant={LabelVariants.Success}>Pago</Label>}
        {!paid && status == "pending" && <Label variant={LabelVariants.Warning}>Pendente</Label>}
        {!paid && status != "pending" && <Label variant={LabelVariants.Error}>Cancelado</Label>}
      </div>
    </ItemElement>
  );
};

export default SaleReportElement;
