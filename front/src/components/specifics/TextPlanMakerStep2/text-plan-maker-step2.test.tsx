import { fireEvent, render } from "@testing-library/react";
import { textPlanMakerPropsMock as mock } from "../TextPlanMaker/text-plan-maker.test";
import { TextPlanMakerStepProps } from "../TextPlanMaker/text-plan-maker.types";

import TextPlanMakerStep2 from "./text-plan-maker-step2.component";

const makeSut = (props: TextPlanMakerStepProps) => render(<TextPlanMakerStep2 {...props} />);

describe("TextPlanMakerStep2", () => {
  it("should render component", () => {
    const wrapper = makeSut(mock);
    expect(wrapper).toBeTruthy();
  });

  it("can go to previous step", async () => {
    const { findByTestId } = makeSut(mock);
    const button = await findByTestId("button-back");
    fireEvent.click(button);
    expect(mock.setCurrentStep).toBeCalledWith(0);
  });

  it("can go to next step", async () => {
    const { findByTestId } = makeSut({ ...mock, ideas: "any_text" });
    const button = await findByTestId("button-next");
    fireEvent.click(button);
    expect(mock.setCurrentStep).toBeCalledWith(2);
  });

  it("cannot go to next step", async () => {
    const { findByTestId } = makeSut(mock);
    const button = await findByTestId("button-next");
    fireEvent.click(button);
    expect(mock.setCurrentStep).not.toBeCalled();
  });
});
