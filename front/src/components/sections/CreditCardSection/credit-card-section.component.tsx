import type { CreditCardSectionProps } from "./credit-card-section.types";

import classNames from "classnames";
import { Button, Card, CreditCard, TextField } from "@andrevantunes/andrevds";

const CreditCardSection = ({ children, className, ...props }: CreditCardSectionProps) => {
  const cn = classNames("credit-card-section", className);
  return (
    <Card className={cn} {...props}>
      <CreditCard
        style={{ maxWidth: 360 }}
        iconName={"mastercard"}
        cardHolder={"André Antunes Vieira"}
        cardNumber={"1234 1324 3214 4321"}
      />

      <div className="credit-card-section__form">
        <TextField label="Número impresso no cartão *" />
        <TextField label="Nome impresso no cartão *" />
        <div className="credit-card-section__form__expire-cvv">
          <div className="credit-card-section__form__expire-cvv__expire">
            <span>Validade *</span>
            <TextField label="dd/aaaa" style={{ width: 120 }} />
          </div>
          <div
            style={{
              display: "flex",
              width: 140,
              alignItems: "center",
              gap: 16,
              justifyContent: "space-between",
            }}
          >
            <span>CVV *</span>
            <TextField label="XXX" style={{ width: 46 }} />
          </div>
        </div>
        <Button>Concluir compra</Button>
      </div>
    </Card>
  );
};

export default CreditCardSection;
