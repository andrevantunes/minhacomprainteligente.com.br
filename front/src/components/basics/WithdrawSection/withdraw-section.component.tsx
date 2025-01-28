import type { WithdrawSectionProps } from "./withdraw-section.types";

import classNames from "classnames";
import { Grid, Text, Title } from "@/components";
import { Card } from "@andrevantunes/andrevds";
import { useEffect } from "react";
import { getBffApi } from "@/requests";

const WithdrawSection = ({ children, className, path, ...props }: WithdrawSectionProps) => {
  const cn = classNames("withdraw-section", className);
  useEffect(() => {
    console.log("Withdraws request", path);
    getBffApi(path).then((x: any) => {
      console.log("Withdraws response", x);
    });
  }, []);
  return (
    <div className={cn} {...props}>
      {children}
      <Grid columns={{ md: [1, 1], sm: [1, 1], xs: [1] }}>
        <Card
          elevation="md"
          style={{ display: "flex", textAlign: "center", flexDirection: "column" }}
        >
          <Text>Valores disponíveis para saque:</Text>
          <Title>R$6,00</Title>
        </Card>
        <Card
          elevation="md"
          style={{ display: "flex", textAlign: "center", flexDirection: "column" }}
        >
          <Text>Valores disponíveis para saque:</Text>
          <Title>R$6,00</Title>
        </Card>
      </Grid>
    </div>
  );
};

export default WithdrawSection;
