import type { ReceivableBalanceSectionProps } from "./receivable-balance-section.types";

import { render } from "@testing-library/react";

import ReceivableBalanceSection from "./receivable-balance-section.component";

const makeSut = (props?: ReceivableBalanceSectionProps) =>
  render(<ReceivableBalanceSection {...props} />);

describe("ReceivableBalanceSection", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
