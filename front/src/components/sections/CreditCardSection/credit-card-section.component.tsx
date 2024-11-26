import type { CreditCardSectionProps } from "./credit-card-section.types";

import classNames from "classnames";
import { Button, Card, CreditCard, TextField } from "@andrevantunes/andrevds";
import { useState } from "react";

const CreditCardSection = ({ children, className, ...props }: CreditCardSectionProps) => {
  const cn = classNames("credit-card-section", className);
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [iconName, setIconName] = useState("");

  const handleChangeCardHolder = (event: any) => {
    const cardHolder = event.target.value;
    setCardHolder(cardHolder);
  };
  const handleChangeCardNumber = (event: any) => {
    const cardNumber = event.target.value;
    if (cardNumber.length > 4) setIconName("mastercard"); //TODO coletar bandeira correta
    setCardNumber(cardNumber);
  };
  const handleChangeExpireDate = (_event: any) => {
    // const _expireDate = event.target.value;
  };

  return (
    <Card className={cn} {...props}>
      <CreditCard
        style={{ maxWidth: 360 }}
        iconName={iconName}
        cardHolder={cardHolder}
        cardNumber={cardNumber}
      />

      <div className="credit-card-section__form">
        <TextField
          label="Número impresso no cartão *"
          mask="9999 9999 9999 9999"
          onChange={handleChangeCardNumber}
        />
        <TextField label="Nome impresso no cartão *" onChange={handleChangeCardHolder} />
        <div className="credit-card-section__form__expire-cvv">
          <div className="credit-card-section__form__expire-cvv__expire">
            <span>
              Validade<sup>*</sup>
            </span>
            <TextField
              mask="99/9999"
              label="dd/aaaa"
              style={{ width: 100 }}
              onChange={handleChangeExpireDate}
            />
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
            <span>
              CVV<sup>*</sup>
            </span>
            <TextField label="XXX" style={{ width: 46 }} />
          </div>
        </div>
        <Button>Concluir compra</Button>
      </div>
    </Card>
  );
};

export default CreditCardSection;
