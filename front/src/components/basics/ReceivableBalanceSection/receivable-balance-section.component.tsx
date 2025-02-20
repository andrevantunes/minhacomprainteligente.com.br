import classNames from "classnames";
import { Card, Display, ItemElement, Loader } from "@andrevantunes/andrevds";
import type { ReceivableBalanceSectionProps } from "./receivable-balance-section.types";
import { useEffect, useState } from "react";
import { getBffApi } from "@/requests";
import { toBrCurrency } from "@/helpers/currency.helper";
import { toBrDateTime } from "@/helpers/datetime.helper";
import { Link } from "@/components";

const ReceivableBalanceSection = ({
  children,
  className,
  ...props
}: ReceivableBalanceSectionProps) => {
  const cn = classNames("receivable-balance-section", className);
  const [receivables, setReceivables] = useState([]);
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    getBffApi("receivables").then((response: any) => {
      setLoading(false);
      if (Array.isArray(response?.receivables)) {
        setReceivables(response.receivables);
      }
    });
  }, []);
  //TODO get receivables
  return (
    <Card className={cn} {...props}>
      {loading && <Loader />}
      {!loading && receivables?.length > 0 && (
        <>
          <Display className="text-center">
            Total de valores a receber:{" "}
            {toBrCurrency(receivables.reduce((acc, receivable: any) => acc + receivable.amount, 0))}
          </Display>
          {receivables.map((recebivable: any) => (
            <ItemElement key={recebivable.id}>
              <div className="flex gap-1x">
                <span>Valor a ser recebido:</span>
                <b>{toBrCurrency(recebivable.amount)}</b>
              </div>
              <div className="flex gap-1x">
                <span>Data de liquidação:</span>
                <b>{toBrDateTime(recebivable.settlement_forecast_at)}</b>
              </div>
              {recebivable?.payment?.order && (
                <Link
                  className="flex gap-1x"
                  href={`/dashboard/sales?hash=${recebivable?.payment?.order?.hash}`}
                >
                  <span>Pagamento referente a venda: </span>
                  <b>{recebivable.payment.order.hash}</b>
                </Link>
              )}
            </ItemElement>
          ))}
        </>
      )}
    </Card>
  );
};

export default ReceivableBalanceSection;
