import type { ProductListProps } from "./product-list.types";

import { render } from "@testing-library/react";

import ProductList from "./product-list.component";

const makeSut = (props?: ProductListProps) => render(<ProductList {...props} />);

describe("ProductList", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
