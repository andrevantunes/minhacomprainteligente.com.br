import type { WithdrawRequestSectionProps } from "./withdraw-request-section.types";

import { render } from "@testing-library/react";

import WithdrawRequestSection from "./withdraw-request-section.component";

const makeSut = (props?: WithdrawRequestSectionProps) =>
  render(<WithdrawRequestSection {...props} />);

describe("WithdrawRequestSection", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
