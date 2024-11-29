import type {PixSectionProps} from "./pix-section.types";

import classNames from "classnames";
import {Button, Card, Loader, Image} from "@andrevantunes/andrevds";
import {useEffect, useState} from "react";
import {toBrCurrency} from "@/helpers/currency.helper";
import {postBffApi} from "@/requests";

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
  const [qrCode, setQrCode] = useState('');
  const [qrUrl, setQrUrl] = useState('');

  useEffect(() => {
    if (a < 1) a++
    else createPix();
  }, []);

  const createPix = async () => {
    setIsCreatingTransaction(true);

    const response = await postBffApi("payments", {
      totalPrice,
      hash,
      payment_method: "pix",
    });

    console.log(response)
    console.log(response?.charges[0])
    console.log(response?.charges[0].last_transaction)
    console.log(response?.charges[0].last_transaction?.qr_code)
    console.log(response?.charges[0].last_transaction?.qr_code_url)

    setQrCode(response?.charges[0].last_transaction?.qr_code);
    setQrUrl(response?.charges[0].last_transaction?.qr_code_url);


    setIsCreatingTransaction(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(qrCode).then(() =>  {
      console.log('Async: Copying to clipboard was successful!');
    }, (err) => {
      console.error('Async: Could not copy text: ', err);
    });
  };

  return (
    <>
      <Card elevation="md" className="text-center">
        <span>Valor a ser pago:</span>
        <strong>{toBrCurrency(totalPrice)}</strong>
      </Card>
      <Card elevation="md" className={cn} {...props}>
        <p>{subTitle}</p>
        {isCreatingTransaction && <Loader/>}
        {!isCreatingTransaction && qrUrl && <Image src={qrUrl} alt="QR Code"/>}

        <Button onClick={handleCopy} disabled={isCreatingTransaction || !qrCode}>
          {isCreatingTransaction ? "Gerando PIX para pagamento" : "Copiar código PIX"}
        </Button>
      </Card>
    </>
  );
};

export default PixSection;
