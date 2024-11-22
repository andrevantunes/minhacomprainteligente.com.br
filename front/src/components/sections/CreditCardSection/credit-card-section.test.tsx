import type { CreditCardSectionProps } from "./credit-card-section.types";

import { render } from "@testing-library/react";

import CreditCardSection from "./credit-card-section.component";

const makeSut = (props?: CreditCardSectionProps) => render(<CreditCardSection {...props} />);

describe("CreditCardSection", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
