import type { WithdrawSectionProps } from "./withdraw-section.types";

import { render } from "@testing-library/react";

import WithdrawSection from "./withdraw-section.component";

const makeSut = (props?: WithdrawSectionProps) => render(<WithdrawSection {...props} />);

describe("WithdrawSection", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
