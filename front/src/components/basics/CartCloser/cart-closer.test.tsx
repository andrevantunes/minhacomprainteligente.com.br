import type { CartCloserProps } from "./cart-closer.types";

import { render } from "@testing-library/react";

import CartCloser from "./cart-closer.component";

const makeSut = (props?: CartCloserProps) => render(<CartCloser {...props} />);

describe("CartCloser", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
