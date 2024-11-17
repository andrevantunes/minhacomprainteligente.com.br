import type { EssayCorrectionProps } from "./essay-correction.types";

import { render } from "@testing-library/react";

import EssayCorrection from "./essay-correction.component";

const makeSut = (props?: EssayCorrectionProps) => render(<EssayCorrection {...props} />);

describe("EssayCorrection", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
