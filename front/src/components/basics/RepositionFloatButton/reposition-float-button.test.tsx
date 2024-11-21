import type { RepositionFloatButtonProps } from "./reposition-float-button.types";

import { render } from "@testing-library/react";

import RepositionFloatButton from "./reposition-float-button.component";

const makeSut = (props?: RepositionFloatButtonProps) =>
  render(<RepositionFloatButton {...props} />);

describe("RepositionFloatButton", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
