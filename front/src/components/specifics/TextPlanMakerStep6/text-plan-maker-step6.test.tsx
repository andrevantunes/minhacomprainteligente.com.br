import { fireEvent, render } from "@testing-library/react";

import TextPlanMakerStep6 from "./text-plan-maker-step6.component";
import { textPlanMakerPropsMock as mock } from "../TextPlanMaker/text-plan-maker.test";

const makeSut = (props?: TextPlanMakerStep6Props) => render(<TextPlanMakerStep6 {...props} />);

describe("TextPlanMakerStep6", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });

  it("can go to previous step", async () => {
    const { findByTestId } = makeSut(mock);
    const button = await findByTestId("button-back");
    fireEvent.click(button);
    expect(mock.setCurrentStep).toBeCalledWith(4);
  });

  it("can go to next step", async () => {
    const { findByTestId } = makeSut({
      ...mock,
      agent: "any_agent",
      action: "any_action",
      means: "any_means",
      aim: "any_aim",
    });
    const button = await findByTestId("button-next");
    fireEvent.click(button);
    expect(mock.setCurrentStep).toBeCalledWith(6);
  });

  it("cannot go to next step", async () => {
    const { findByTestId } = makeSut(mock);
    const button = await findByTestId("button-next");
    fireEvent.click(button);
    expect(mock.setCurrentStep).not.toBeCalled();
  });
});
