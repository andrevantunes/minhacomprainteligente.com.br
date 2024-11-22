import type { CheckoutProductProps } from "./checkout-product.types";

import { render } from "@testing-library/react";

import CheckoutProduct from "./checkout-product.component";

const makeSut = (props?: CheckoutProductProps) => render(<CheckoutProduct {...props} />);

describe("CheckoutProduct", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
