import type { SaleReportElementProps } from "./sale-report-element.types";

import classNames from "classnames";
import { Icon, ItemElement, Label } from "@andrevantunes/andrevds";
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
  status,
  createdAt,
  name,
  ...props
}: SaleReportElementProps) => {
  const cn = classNames("sale-report-element", className);
  const paid = status === "paid";
  return (
    <ItemElement size={"md" as any} className={cn} {...props}>
      <div>
        <Icon name={paymentMethod === "credit_card" ? "credit-card" : "pix"} />
      </div>
      <div className="flex-grow">
        <Title>{propertyName}</Title>
        <small>
          {toBrDateTime(createdAt as string)} - {name}
        </small>
      </div>
      <div className="sale-report-element__amount flex flex-column justify-content-center align-items-center">
        <Title
          className={classNames({
            "sale-report-element__amount__canceled": !paid,
            "sale-report-element__amount__success": paid,
          })}
        >
          {toBrCurrency(amount as string)}
        </Title>
        <Label variant={(paid ? "success" : "error") as any}>{paid ? "Pago" : "Cancelado"}</Label>
      </div>
    </ItemElement>
  );
};

export default SaleReportElement;
