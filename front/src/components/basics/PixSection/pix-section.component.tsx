import type { PixSectionProps } from "./pix-section.types";
import copy from "copy-to-clipboard";

import classNames from "classnames";
import { Button, Card, Loader, Image, ItemElement } from "@andrevantunes/andrevds";
import { useEffect, useState } from "react";
import { toBrCurrency } from "@/helpers/currency.helper";
import { getBffApi, postBffApi } from "@/requests";
import { notifySuccess } from "@/helpers/notify.helper";

let a = 0;
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

  useEffect(() => {
    if (a < 1) a++;
    else createPix();
  }, []);

  const createPix = async () => {
    setIsCreatingTransaction(true);

    const response = await postBffApi("payments", {
      totalPrice,
      hash,
      payment_method: "pix",
    });

    console.log(response);

    setQrCode(response?.charges?.[0].last_transaction?.qr_code);
    setQrUrl(response?.charges?.[0].last_transaction?.qr_code_url);

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
      <Card elevation="md" className="text-center">
        <span>Valor a ser pago:</span>
        <strong>{toBrCurrency(totalPrice)}</strong>
      </Card>
      <Card elevation="md" className={cn} {...props}>
        <p>{subTitle}</p>
        {isCreatingTransaction && <Loader />}
        {!isCreatingTransaction && qrUrl && <Image src={qrUrl} alt="QR Code" />}

        <ItemElement onClick={handleCopy}>{qrCode}</ItemElement>

        <Button onClick={handleCopy} disabled={isCreatingTransaction || !qrCode}>
          {isCreatingTransaction ? "Gerando PIX para pagamento" : "Copiar código PIX"}
        </Button>
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
