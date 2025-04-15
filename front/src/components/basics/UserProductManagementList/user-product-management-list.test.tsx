import type { UserProductManagementListProps } from "./user-product-management-list.types";

import { render } from "@testing-library/react";

import UserProductManagementList from "./user-product-management-list.component";

const makeSut = (props?: UserProductManagementListProps) =>
  render(<UserProductManagementList {...props} />);

describe("UserProductManagementList", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
