import type { SnackBarProps } from "./snack-bar.types";

import { render } from "@testing-library/react";

import SnackBar from "./snack-bar.component";

const makeSut = (props?: SnackBarProps) => render(<SnackBar {...props} />);

describe("SnackBar", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
