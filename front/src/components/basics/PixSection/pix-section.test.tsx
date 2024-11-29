import type { PixSectionProps } from "./pix-section.types";

import { render } from "@testing-library/react";

import PixSection from "./pix-section.component";

const makeSut = (props?: PixSectionProps) => render(<PixSection {...props} />);

describe("PixSection", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
