import type { PropertySelectionProps } from "./property-selection.types";

import { render } from "@testing-library/react";

import PropertySelection from "./property-selection.component";

const makeSut = (props?: PropertySelectionProps) => render(<PropertySelection {...props} />);

describe("PropertySelection", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
