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
  return (
    <ItemElement size={"md" as any} className={cn} {...props}>
      <div>
        <Icon name={paymentMethod === "credit_card" ? "credit-card" : "pix"} />
      </div>
      <div className="flex-grow">
        <Title>{propertyName}</Title>
        <Title>{toBrCurrency(amount as string)}</Title>
        <small>
          {toBrDateTime(createdAt as string)} - {name}
        </small>
      </div>
      <Label variant={(status === "paid" ? "success" : "default") as any}>
        {status === "paid" ? "Pago" : "Erro"}
      </Label>
    </ItemElement>
  );
};

export default SaleReportElement;
