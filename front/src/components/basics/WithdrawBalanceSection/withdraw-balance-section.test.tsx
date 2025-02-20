import type { WithdrawBalanceSectionProps } from "./withdraw-balance-section.types";

import { render } from "@testing-library/react";

import WithdrawBalanceSection from "./withdraw-balance-section.component";

const makeSut = (props?: WithdrawBalanceSectionProps) =>
  render(<WithdrawBalanceSection {...props} />);

describe("WithdrawBalanceSection", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
