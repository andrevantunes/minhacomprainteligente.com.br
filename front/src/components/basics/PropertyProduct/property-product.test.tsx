import type { PropertyProductProps } from "./property-product.types";

import { render } from "@testing-library/react";

import PropertyProduct from "./property-product.component";

const makeSut = (props?: PropertyProductProps) => render(<PropertyProduct {...props} />);

describe("PropertyProduct", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
