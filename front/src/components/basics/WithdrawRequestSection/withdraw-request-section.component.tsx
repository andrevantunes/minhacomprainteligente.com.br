import type { WithdrawRequestSectionProps } from "./withdraw-request-section.types";

import classNames from "classnames";
import { Card, Loader, TextField } from "@andrevantunes/andrevds";
import { useEffect, useState } from "react";
import { getBffApi, postBffApi } from "@/requests";
import { toBrCurrency } from "@/helpers/currency.helper";
import { Button } from "@/components";
import FingerprintJS from "@fingerprintjs/fingerprintjs";

const WithdrawRequestSection = ({ children, className, ...props }: WithdrawRequestSectionProps) => {
  const cn = classNames("withdraw-request-section", className);
  const [wallet, setWallet] = useState(null as any);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  useEffect(() => {
    setLoading(true);
    getBffApi("wallets").then((response: any) => {
      setWallet(response.wallets[0]);
      setLoading(false);
    });
  }, []);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    setLoading(true);
    const textInput = event.target.querySelector("#withdraw-amount");
    if (/^(\d+),(\d{2})$/.test(textInput.value) || /^(\d+)$/.test(textInput.value)) {
      console.log("Pode enviar");
      setError("");
      const amount = Number(textInput.value.replace(/^(\d+)$/, "$1,00").replace(/\D/, ""));

      const fp = await FingerprintJS.load();
      const { visitorId } = await fp.get();
      postBffApi(`wallets/${wallet.id}/withdraw`, { amount, fingerprint: visitorId }).then(
        (response: any) => {
          console.log(response);
        }
      );
    } else {
      setError('Preencha em reais no formato: "99" ou "99,99"');
    }
    setLoading(false);
  };

  return (
    <Card className={cn} {...props}>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            error={error}
            label="Digite o valor que você deseja sacar"
            name="amount"
            id="withdraw-amount"
          />
        </div>
        <div className="flex align-items-center justify-content-center pb-2x">
          <span>Valor máximo atual disponível para saque: </span>

          {loading ? <Loader /> : <b>{toBrCurrency(wallet?.amount)}</b>}
        </div>
        <div className="flex align-items-center justify-content-center pt-2x">
          <Button type="submit" disabled={loading}>
            Solicitar saque
          </Button>
        </div>
      </form>
    </Card>
  );
};

export default WithdrawRequestSection;
