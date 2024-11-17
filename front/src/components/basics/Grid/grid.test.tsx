import type { GridProps } from "./grid.types";

import { render } from "@testing-library/react";

import Grid from "./grid.component";

const makeSut = (props?: GridProps) => render(<Grid {...props} />);

describe("Grid", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
