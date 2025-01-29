import type { WithdrawSectionProps } from "./withdraw-section.types";

import classNames from "classnames";
import { Grid, Text, Title } from "@/components";
import { Card } from "@andrevantunes/andrevds";
import {useEffect, useState} from "react";
import { getBffApi } from "@/requests";
import {toBrCurrency} from "@/helpers/currency.helper";

const WithdrawSection = ({ children, className, path, ...props }: WithdrawSectionProps) => {
  const cn = classNames("withdraw-section", className);
  const [wallets, setWallets] = useState([]);
  useEffect(() => {
    getBffApi(path).then((response: any) => {
      const resWallets = response.wallets.map((wallet) => {
        return {
          ...wallet,
          receivableAmount: wallet.receivables.reduce((acc, receivable) => acc + receivable.amount, 0),
        };
      });
      setWallets(resWallets);
    });
  }, []);
  return (
    <div className={cn} {...props}>
      {children}
      {wallets.map((wallet) => (
        <div key={wallet.id}>
          <Grid columns={{ md: [1, 1], sm: [1, 1], xs: [1] }}>
            <Card
              elevation="md"
              style={{ display: "flex", textAlign: "center", flexDirection: "column" }}
            >
              <Text>Valores disponíveis para saque:</Text>
              <Title>{toBrCurrency(wallet.amount)}</Title>
            </Card>
            {wallet.receivableAmount && (
              <Card
                elevation="md"
                style={{ display: "flex", textAlign: "center", flexDirection: "column" }}
              >
                <Text>Valores a receber em breve:</Text>
                <Title>{toBrCurrency(wallet.receivableAmount)}</Title>
              </Card>
            )}
          </Grid>
        </div>
      ))}
    </div>
  );
};

export default WithdrawSection;
