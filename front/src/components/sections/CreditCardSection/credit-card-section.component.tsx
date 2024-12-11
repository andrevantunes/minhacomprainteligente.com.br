import type { CreditCardSectionProps } from "./credit-card-section.types";

import classNames from "classnames";
import { Button, Card, CreditCard, TextField } from "@andrevantunes/andrevds";
import { useState } from "react";
import { toBrCurrency } from "@/helpers/currency.helper";
import { postBffApi } from "@/requests";
import Router from "next/router";
import { notifyError } from "@/helpers/notify.helper";
import Script from "next/script";

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

  const handleSubmitPayment = async (event: any) => {
    event.preventDefault();
    setIsSubmitting(true);

    // Validação simples dos dados do formulário
    if (!cardHolder || !cardNumber || !expireDate || !cvv) {
      alert("Por favor, preencha todos os campos obrigatórios.");
      setIsSubmitting(false);
      return;
    }

    try {
      validateRecaptcha("PAY").then(async (recaptchaToken) => {
        await postBffApi("payments", {
          cardHolder,
          cardNumber,
          expireDate,
          cvv,
          totalPrice,
          hash,
          recaptchaToken,
          payment_method: "credit_card",
        });
        Router.push("/pagamento/sucesso?hash=" + hash);
      });
    } catch (error) {
      notifyError("Ocorreu um erro, confira seus dados e tente novamente");
    }

    setIsSubmitting(false);
  };

  return (
    <>
      <Script
        src={`https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY}`}
      />
      <Card elevation="md" className="text-center">
        <span>Valor a ser pago:</span>
        <strong>{toBrCurrency(totalPrice)}</strong>
      </Card>
      <Card elevation="md" className={cn} {...props}>
        <CreditCard
          style={{ maxWidth: 360 }}
          iconName={iconName}
          cardHolder={cardHolder}
          cardNumber={cardNumber}
        />

        <form action="#" className="credit-card-section__form block">
          <TextField
            label="Número impresso no cartão *"
            name="credit_card_number"
            mask="9999 9999 9999 9999"
            onChange={handleChangeCardNumber}
          />
          <TextField
            label="Nome impresso no cartão *"
            onChange={handleChangeCardHolder}
            name="credit_card_holder"
          />
          <div className="credit-card-section__form__expire-cvv">
            <div className="credit-card-section__form__expire-cvv__expire">
              <span>
                Validade<sup>*</sup>
              </span>
              <TextField
                mask="99/9999"
                label="dd/aaaa"
                style={{ width: 100 }}
                name="credit_card_expire_date"
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
              <TextField
                label="XXX"
                style={{ width: 46 }}
                onChange={handleChangeCvv}
                name="credit_card_cvv"
              />
            </div>
          </div>
          <Button
            onClick={handleSubmitPayment}
            disabled={isSubmitting}
            loading={isSubmitting}
            className="flex flex-row"
          >
            {isSubmitting ? "Processando..." : "Concluir compra"}
          </Button>
        </form>
      </Card>
    </>
  );
};

function validateRecaptcha(action = "PAY") {
  return new Promise((resolve, _reject) => {
    if (!process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY) return resolve("");
    // @ts-ignore
    grecaptcha.enterprise.ready(async () => {
      // @ts-ignore
      const recaptchaToken = await grecaptcha.enterprise.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        { action }
      );
      resolve(recaptchaToken);
    });
  });
}

export default CreditCardSection;
