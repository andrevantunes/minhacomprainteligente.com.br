import type { CartSummaryProps } from "./cart-summary.types";

import { render } from "@testing-library/react";

import CartSummary from "./cart-summary.component";

const makeSut = (props?: CartSummaryProps) => render(<CartSummary {...props} />);

describe("CartSummary", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
