import { fireEvent, render } from "@testing-library/react";
import { textPlanMakerPropsMock as mock } from "../TextPlanMaker/text-plan-maker.test";
import { TextPlanMakerStepProps } from "../TextPlanMaker/text-plan-maker.types";

import TextPlanMakerStep4 from "./text-plan-maker-step4.component";

const makeSut = (props: TextPlanMakerStepProps) => render(<TextPlanMakerStep4 {...props} />);

describe("TextPlanMakerStep4", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });

  it("can go to previous step", async () => {
    const { findByTestId } = makeSut(mock);
    const button = await findByTestId("button-back");
    fireEvent.click(button);
    expect(mock.setCurrentStep).toBeCalledWith(2);
  });

  it("can go to next step", async () => {
    const { findByTestId } = makeSut({ ...mock, firstArgument: "any_text" });
    const button = await findByTestId("button-next");
    fireEvent.click(button);
    expect(mock.setCurrentStep).toBeCalledWith(4);
  });

  it("cannot go to next step", async () => {
    const { findByTestId } = makeSut(mock);
    const button = await findByTestId("button-next");
    fireEvent.click(button);
    expect(mock.setCurrentStep).not.toBeCalled();
  });
});
