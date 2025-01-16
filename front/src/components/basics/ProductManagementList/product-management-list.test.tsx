import type { ProductManagementListProps } from "./product-management-list.types";

import { render } from "@testing-library/react";

import ProductManagementList from "./product-management-list.component";

const makeSut = (props?: ProductManagementListProps) =>
  render(<ProductManagementList {...props} />);

describe("ProductManagementList", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
