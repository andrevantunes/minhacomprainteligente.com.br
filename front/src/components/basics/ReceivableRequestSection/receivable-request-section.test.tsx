import type { ReceivableRequestSectionProps } from "./receivable-request-section.types";

import { render } from "@testing-library/react";

import ReceivableRequestSection from "./receivable-request-section.component";

const makeSut = (props?: ReceivableRequestSectionProps) =>
  render(<ReceivableRequestSection {...props} />);

describe("ReceivableRequestSection", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
