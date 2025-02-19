import type { HTMLProps, PropsWithChildren } from "react";

interface WithdrawSectionProps extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
  path?: string;
  withdrawBalanceUrl?: string;
  withdrawRequestUrl?: string;
  receivableBalanceUrl?: string;
  receivableRequestUrl?: string;
}

export type { WithdrawSectionProps };
