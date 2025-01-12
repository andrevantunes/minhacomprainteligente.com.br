import type { PixSectionProps } from "./pix-section.types";
import copy from "copy-to-clipboard";

import classNames from "classnames";
import {
  Image,
  Button,
  Card,
  Loader,
  ItemElement,
  Stepper,
  TextField,
} from "@andrevantunes/andrevds";
import { useEffect, useState } from "react";
import { toBrCurrency } from "@/helpers/currency.helper";
import { getBffApi, postBffApi } from "@/requests";
import { notifySuccess } from "@/helpers/notify.helper";
import { validateRecaptcha } from "@/helpers/recaptcha.helper";
import Script from "next/script";

const PixSection = ({
  children,
  className,
  totalPrice,
  subTitle,
  hash,
  ...props
}: PixSectionProps) => {
  const cn = classNames("pix-section", className);
  const [isCreatingTransaction, setIsCreatingTransaction] = useState(false);
  const [qrCode, setQrCode] = useState("");
  const [qrUrl, setQrUrl] = useState("");
  const [step, setStep] = useState(1);
  const [stepOneValid, setStepOneValid] = useState(false);
  const [customer, setCustomer] = useState({} as any);

  const handleChangeCustomerField = (event: any) => {
    const name = event.target.name;
    console.log(event.target.name, event.target);
    const newCustomer = { ...customer, [name]: event.target.value };
    setCustomer(newCustomer);
    setStepOneValid(newCustomer.name && newCustomer.document);
  };

  const handleNextStep = () => {
    void createPix();
    setStep(2);
  };

  const createPix = async () => {
    setIsCreatingTransaction(true);

    const response = await validateRecaptcha("PAY").then(async (recaptchaToken) => {
      return postBffApi("payments", {
        totalPrice,
        hash,
        recaptchaToken,
        customer,
        payment_method: "pix",
      });
    });

    setQrCode(response?.qrCode);
    setQrUrl(response?.qrImage);

    setIsCreatingTransaction(false);
  };

  const handleCopy = () => {
    copy(qrCode, { format: "text/plain" });
    notifySuccess("QRCode copiado com sucesso");
  };

  useEffect(() => {
    void poolingPayment(hash);
  }, []);

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
                  onChange={handleChangeCustomerField}
                  name="name"
                />
              </div>
              <div>
                <TextField
                  label="Seu CPF*"
                  onChange={handleChangeCustomerField}
                  mask="999.999.999-99"
                  name="document"
                />
              </div>
              <div>
                <TextField label="Seu email" onChange={handleChangeCustomerField} name="email" />
              </div>
              <div>
                <TextField
                  label="Seu telefone"
                  onChange={handleChangeCustomerField}
                  mask="(99) 99999-9999"
                  name="phone"
                />
              </div>
              <Button onClick={handleNextStep} disabled={!stepOneValid} className="flex flex-row">
                Continuar
              </Button>
            </div>

            <div
              className={classNames(
                "payment-section__content gap-1x flex flex-column align-items-center",
                {
                  active: step == 2,
                }
              )}
            >
              <p>{subTitle}</p>
              {isCreatingTransaction && <Loader />}
              {!isCreatingTransaction && qrUrl && <Image src={qrUrl} alt="QR Code" />}

              <ItemElement onClick={handleCopy}>{qrCode}</ItemElement>

              <Button onClick={handleCopy} disabled={isCreatingTransaction || !qrCode}>
                {isCreatingTransaction ? "Gerando PIX para pagamento" : "Copiar código PIX"}
              </Button>
            </div>
          </div>
        </form>
      </Card>
    </>
  );
};

function poolingPayment(hash: string) {
  return getBffApi(`carts/payment/${hash}`).then((r) => {
    if (r?.order?.status === "paid") {
      location.href = `/pagamento/sucesso?hash=${hash}`;
    } else {
      setTimeout(() => {
        poolingPayment(hash);
      }, 20000);
    }
  });
}

export default PixSection;
