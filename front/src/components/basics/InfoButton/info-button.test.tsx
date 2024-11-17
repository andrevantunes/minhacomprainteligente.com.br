import type { InfoButtonProps } from "./info-button.types";

import { render } from "@testing-library/react";

import InfoButton from "./info-button.component";

const testId = "info-button-testid";

const defaultProps: InfoButtonProps = {
  iconName: "info",
  variant: "text",
};

const makeSut = (props?: InfoButtonProps) =>
  render(<InfoButton data-testid={testId} {...defaultProps} {...props} />);

describe("<InfoButton>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
