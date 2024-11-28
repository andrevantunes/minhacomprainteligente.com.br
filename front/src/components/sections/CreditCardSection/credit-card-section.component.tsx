import type { CreditCardSectionProps } from "./credit-card-section.types";

import classNames from "classnames";
import { Button, Card, CreditCard, TextField } from "@andrevantunes/andrevds";
import { useState } from "react";
import { toBrCurrency } from "@/helpers/currency.helper";
import { postBffApi } from "@/requests";

const CreditCardSection = ({
  children,
  className,
  totalPrice,
  hash,
  ...props
}: CreditCardSectionProps) => {
  const cn = classNames("credit-card-section", className);
  const [cardHolder, setCardHolder] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [iconName, setIconName] = useState("");

  const [expireDate, setExpireDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChangeCardHolder = (event: any) => {
    const cardHolder = event.target.value;
    setCardHolder(cardHolder);
  };
  const handleChangeCardNumber = (event: any) => {
    const cardNumber = event.target.value;
    if (cardNumber.length > 4) setIconName("mastercard"); //TODO coletar bandeira correta
    setCardNumber(cardNumber);
  };
  const handleChangeCvv = (event: any) => {
    setCvv(event.target.value);
  };
  const handleChangeExpireDate = (event: any) => {
    setExpireDate(event.target.value);
  };

  const handleSubmitPayment = async () => {
    setIsSubmitting(true);

    // Validação simples dos dados do formulário
    if (!cardHolder || !cardNumber || !expireDate || !cvv) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await postBffApi("payments", {
        cardHolder,
        cardNumber,
        expireDate,
        cvv,
        totalPrice,
        hash,
        method: "credit-card",
      });

      const result = await response.json();

      if (result.success) {
        alert("Pagamento concluído com sucesso!");
      } else {
        alert("Erro ao processar o pagamento: " + result.message);
      }
    } catch (error) {
      console.error("Erro ao processar o pagamento:", error);
      alert("Ocorreu um erro ao processar o pagamento.");
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <Card elevation="md" className="text-center">
        <span>Valor a ser pago:</span>
        <strong>{toBrCurrency(totalPrice)}</strong>
      </Card>
      <Card className={cn} {...props}>
        <CreditCard
          style={{ maxWidth: 360 }}
          iconName={iconName}
          cardHolder={cardHolder}
          cardNumber={cardNumber}
        />

        <form className="credit-card-section__form block">
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
              <TextField label="XXX" style={{ width: 46 }} onChange={handleChangeCvv} />
            </div>
          </div>
          <Button onClick={handleSubmitPayment} disabled={isSubmitting}>
            {isSubmitting ? "Processando..." : "Concluir compra"}
          </Button>
        </form>
      </Card>
    </>
  );
};

export default CreditCardSection;
