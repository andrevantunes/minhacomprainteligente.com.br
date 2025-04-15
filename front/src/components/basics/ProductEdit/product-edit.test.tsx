import type { ProductEditProps } from "./product-edit.types";

import { render } from "@testing-library/react";

import ProductEdit from "./product-edit.component";

const makeSut = (props?: ProductEditProps) => render(<ProductEdit {...props} />);

describe("ProductEdit", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
