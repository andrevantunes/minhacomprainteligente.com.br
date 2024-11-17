import type { ProductProps } from "./product.types";

import { render } from "@testing-library/react";

import Product from "./product.component";

const makeSut = (props?: ProductProps) => render(<Product {...props} />);

describe("Product", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
