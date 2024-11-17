import { fireEvent, render } from "@testing-library/react";
import { textPlanMakerPropsMock as mock } from "../TextPlanMaker/text-plan-maker.test";
import { TextPlanMakerStepProps } from "../TextPlanMaker/text-plan-maker.types";

import TextPlanMakerStep1 from "./text-plan-maker-step1.component";

const makeSut = (props: TextPlanMakerStepProps) => render(<TextPlanMakerStep1 {...props} />);

describe("TextPlanMakerStep1", () => {
  it("should render component", () => {
    const wrapper = makeSut(mock);
    expect(wrapper).toBeTruthy();
  });

  it("can go to next step", async () => {
    const { findByTestId } = makeSut(mock);
    const button = await findByTestId("button-next");
    fireEvent.click(button);
    expect(mock.setCurrentStep).toBeCalledWith(1);
  });
});
