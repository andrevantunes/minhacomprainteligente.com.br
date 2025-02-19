import type { WithdrawSectionProps } from "./withdraw-section.types";

import classNames from "classnames";
import { Button, Grid, Text, Title } from "@/components";
import { Card } from "@andrevantunes/andrevds";
import { useEffect, useState } from "react";
import { getBffApi } from "@/requests";
import { toBrCurrency } from "@/helpers/currency.helper";

const WithdrawSection = ({
  children,
  className,
  path,
  withdrawBalanceUrl,
  withdrawRequestUrl,
  receivableBalanceUrl,
  receivableRequestUrl,
  ...props
}: WithdrawSectionProps) => {
  const cn = classNames("withdraw-section", className);
  const [wallets, setWallets] = useState([]);
  useEffect(() => {
    getBffApi(path).then((response: any) => {
      const resWallets = response.wallets.map((wallet: any) => {
        return {
          ...wallet,
          receivableAmount: wallet.receivables.reduce(
            (acc: number, receivable: any) => acc + receivable.amount,
            0
          ),
        };
      });
      setWallets(resWallets);
    });
  }, []);
  return (
    <div className={cn} {...props}>
      {children}
      {wallets.map((wallet: any) => (
        <div key={wallet.id}>
          <Grid columns={{ md: [1, 1], sm: [1, 1], xs: [1] }}>
            <Card
              elevation="md"
              style={{ display: "flex", textAlign: "center", flexDirection: "column" }}
            >
              <div className="mb-1x">
                <Text>Valores disponíveis para saque:</Text>
                <Title>{toBrCurrency(wallet.amount)}</Title>
              </div>
              <div className="withdraw-section__buttons flex align-items-center justify-content-center gap-1x">
                <Button href={withdrawBalanceUrl} variant="secondary">
                  Ver extrato
                </Button>
                <Button href={withdrawRequestUrl}>Solicitar saque</Button>
              </div>
            </Card>
            {wallet.receivableAmount && (
              <Card
                elevation="md"
                style={{ display: "flex", textAlign: "center", flexDirection: "column" }}
              >
                <div className="mb-1x">
                  <Text>Valores a receber em breve:</Text>
                  <Title>{toBrCurrency(wallet.receivableAmount)}</Title>
                </div>
                <div className="withdraw-section__buttons flex align-items-center justify-content-center gap-1x">
                  <Button href={receivableBalanceUrl} variant="secondary">
                    Ver recebimentos futuros
                  </Button>
                  <Button href={receivableRequestUrl}>Solicitar antecipação</Button>
                </div>
              </Card>
            )}
          </Grid>
        </div>
      ))}
    </div>
  );
};

export default WithdrawSection;
