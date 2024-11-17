import type { StepProps } from "./step.types";

import { render } from "@testing-library/react";

import Step from "./step.component";

const makeSut = (props?: StepProps) => render(<Step {...props} />);

describe("Step", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
