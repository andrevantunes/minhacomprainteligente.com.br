import type { CreditCardSectionProps } from "./credit-card-section.types";

import classNames from "classnames";
import { Button, Card, CreditCard, Stepper, TextField } from "@andrevantunes/andrevds";
import { useState } from "react";
import { toBrCurrency } from "@/helpers/currency.helper";
import { postBffApi } from "@/requests";
import Router from "next/router";
import { notifyError } from "@/helpers/notify.helper";
import Script from "next/script";
import FingerprintJS from "@fingerprintjs/fingerprintjs";
import { validateRecaptcha } from "@/helpers/recaptcha.helper";

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
  const [fetching, setFetching] = useState(false);

  const [expireDate, setExpireDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [customer, setCustomer] = useState({} as any);
  const [step, setStep] = useState(1);
  const [stepOneValid, setStepOneValid] = useState(false);
  const [stepTwoValid, setStepTwoValid] = useState(false);
  const handleChangeCardHolder = (event: any) => {
    const cardHolder = event.target.value;
    setCardHolder(cardHolder);
    setStepTwoValid(cardHolder && cardNumber && cvv && expireDate);
  };
  const handleChangeCardNumber = (event: any) => {
    const cardNumber = event.target.value;
    if (cardNumber.length > 4) setIconName("mastercard"); //TODO coletar bandeira correta
    setCardNumber(cardNumber);
    setStepTwoValid(cardHolder && cardNumber && cvv && expireDate);
  };
  const handleChangeCvv = (event: any) => {
    const cvv = event.target.value;
    setCvv(cvv);
    setStepTwoValid(cardHolder && cardNumber && cvv && expireDate);
  };
  const handleChangeExpireDate = (event: any) => {
    const expireDate = event.target.value;
    setExpireDate(expireDate);
    setStepTwoValid(cardHolder && cardNumber && cvv && expireDate);
  };

  const handleChangeCustomerName = (event: any) => {
    const newCustomer = { ...customer, name: event.target.value };
    setCustomer(newCustomer);
    setStepOneValid(newCustomer.name);
  };
  const handleChangeCustomerDocument = (event: any) => {
    const newCustomer = { ...customer, document: event.target.value };
    setCustomer(newCustomer);
    setStepOneValid(newCustomer.name);
  };
  const handleChangeCustomerEmail = (event: any) => {
    const newCustomer = { ...customer, email: event.target.value };
    setCustomer(newCustomer);
  };
  const handleChangeCustomerPhone = (event: any) => {
    const newCustomer = { ...customer, phone: event.target.value };
    setCustomer(newCustomer);
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

    const fp = await FingerprintJS.load();
    const { visitorId } = await fp.get();

    try {
      setFetching(true);
      validateRecaptcha("PAY").then(async (recaptchaToken) => {
        await postBffApi("payments", {
          cardHolder,
          cardNumber,
          expireDate,
          cvv,
          totalPrice,
          hash,
          customer,
          recaptchaToken,
          payment_method: "credit_card",
          fingerprint: visitorId,
        });
        Router.push("/payment/success?hash=" + hash);
      });
    } catch (error) {
      setFetching(false);
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
        <form action="#">
          <Stepper position={step} steps={["Identificação", "Pagamento"]} />
          <div className="payment-section__container">
            <div
              className={classNames(
                "payment-section__content gap-1x flex flex-column align-items-stretch",
                {
                  active: step == 1,
                }
              )}
            >
              <h2 className="text-center">Identificação:</h2>
              <div>
                <TextField
                  label="Seu nome completo*"
                  onChange={handleChangeCustomerName}
                  name="name"
                />
              </div>
              <div>
                <TextField
                  label="Seu CPF"
                  onChange={handleChangeCustomerDocument}
                  mask="999.999.999-99"
                  name="document"
                />
              </div>
              <div>
                <TextField label="Seu email" onChange={handleChangeCustomerEmail} name="email" />
              </div>
              <div>
                <TextField
                  label="Seu telefone"
                  onChange={handleChangeCustomerPhone}
                  mask="(99) 99999-9999"
                  name="phone"
                />
              </div>
              <Button
                loading={fetching}
                onClick={() => setStep(2)}
                disabled={fetching || !stepOneValid}
                className="flex flex-row"
              >
                Continuar
              </Button>
            </div>
            <div
              className={classNames(
                "payment-section__content gap-1x flex flex-column align-items-stretch",
                {
                  active: step == 2,
                }
              )}
            >
              <div className="credit-card-section__form">
                <div className="credit-card-section__credit_card_container">
                  <CreditCard
                    style={{ maxWidth: 360 }}
                    iconName={iconName}
                    cardHolder={cardHolder}
                    cardNumber={cardNumber}
                  />
                </div>

                <div className="credit-card-section__form__block1">
                  <h2>Dados do cartão:</h2>
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
                </div>
              </div>
              <Button
                onClick={handleSubmitPayment}
                disabled={isSubmitting || !stepTwoValid}
                loading={isSubmitting}
                className="flex flex-row"
              >
                {isSubmitting ? "Processando..." : "Concluir compra"}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </>
  );
};

export default CreditCardSection;
