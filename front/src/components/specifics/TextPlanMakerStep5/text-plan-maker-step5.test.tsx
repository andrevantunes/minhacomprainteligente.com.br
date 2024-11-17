import { fireEvent, render } from "@testing-library/react";

import TextPlanMakerStep5 from "./text-plan-maker-step5.component";
import { textPlanMakerPropsMock as mock } from "../TextPlanMaker/text-plan-maker.test";
import { TextPlanMakerStepProps } from "../TextPlanMaker/text-plan-maker.types";

const makeSut = (props: TextPlanMakerStepProps) => render(<TextPlanMakerStep5 {...props} />);

describe("TextPlanMakerStep5", () => {
  it("should render component", () => {
    const wrapper = makeSut(mock);
    expect(wrapper).toBeTruthy();
  });

  it("can go to previous step", async () => {
    const { findByTestId } = makeSut(mock);
    const button = await findByTestId("button-back");
    fireEvent.click(button);
    expect(mock.setCurrentStep).toBeCalledWith(3);
  });

  it("can go to next step", async () => {
    const { findByTestId } = makeSut({ ...mock, secondArgument: "any_text" });
    const button = await findByTestId("button-next");
    fireEvent.click(button);
    expect(mock.setCurrentStep).toBeCalledWith(5);
  });

  it("cannot go to next step", async () => {
    const { findByTestId } = makeSut(mock);
    const button = await findByTestId("button-next");
    fireEvent.click(button);
    expect(mock.setCurrentStep).not.toBeCalled();
  });
});
