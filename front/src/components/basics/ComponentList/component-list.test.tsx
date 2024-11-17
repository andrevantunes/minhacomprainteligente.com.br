import type { ComponentListProps } from "./component-list.types";

import { render } from "@testing-library/react";

import ComponentList from "./component-list.component";

const makeSut = (props?: ComponentListProps) => render(<ComponentList {...props} />);

describe("ComponentList", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
