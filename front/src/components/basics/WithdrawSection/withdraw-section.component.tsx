import type { WithdrawSectionProps } from "./withdraw-section.types";

import classNames from "classnames";
import { Button, Grid, Text, Title } from "@/components";
import { Card, ItemElement, Label, LabelVariants } from "@andrevantunes/andrevds";
import { useEffect, useState } from "react";
import { getBffApi } from "@/requests";
import { toBrCurrency } from "@/helpers/currency.helper";
import { toBrDateTime } from "@/helpers/datetime.helper";

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
  const [withdraws, setWithdraws] = useState([]);
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
      setWithdraws(response.withdraws);
    });
  }, []);
  return (
    <div className={cn} {...props}>
      {children}
      {wallets.map((wallet: any) => {
        const hasReceivables = !!wallet.receivableAmount;
        const columns = hasReceivables ? { md: [1, 1], sm: [1, 1], xs: [1] } : "1";
        return (
          <div key={wallet.id}>
            <Grid columns={columns} className="mb-2x">
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
              {hasReceivables ? (
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
              ) : null}
            </Grid>

            {withdraws?.length > 0 && (
              <Card className={cn} {...props}>
                <Title>Solicitações de saque</Title>
                <p>
                  As solicitações em aberto tem o prazo de até 24h para serem analisadas e
                  transferidas para você.
                </p>
                {withdraws.map((withdraw: any) => (
                  <ItemElement key={withdraw.created_at} className="flex justify-content-between">
                    <div>
                      <div>
                        <span>Solicitação de saque realiazada em: </span>
                        <b>{toBrDateTime(withdraw.created_at)}</b>
                      </div>
                      {withdraw.paid_at && (
                        <div>
                          <span>Solicitação de saque paga em: </span>
                          <b>{toBrDateTime(withdraw.paid_at)}</b>
                        </div>
                      )}
                    </div>
                    <div className="flex flex-column text-center">
                      <Title>{toBrCurrency(withdraw.amount)}</Title>
                      <WithdrawStatus status={withdraw.status} />
                    </div>
                  </ItemElement>
                ))}
              </Card>
            )}
          </div>
        );
      })}
    </div>
  );
};

const WithdrawStatus = ({ status }: { status: string }) => {
  const configs: any = {
    pending: {
      variant: LabelVariants.Warning,
      children: "Em aberto",
    },
    paid: {
      variant: LabelVariants.Success,
      children: "Pago",
    },
    error: {
      variant: LabelVariants.Error,
      children: "Cancelada",
    },
  };
  return <Label variant={configs[status].variant}>{configs[status].children}</Label>;
};

export default WithdrawSection;
