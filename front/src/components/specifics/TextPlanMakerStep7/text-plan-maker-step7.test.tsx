import { fireEvent, render } from "@testing-library/react";
import { textPlanMakerPropsMock as mock } from "../TextPlanMaker/text-plan-maker.test";
import { TextPlanMakerStepProps } from "../TextPlanMaker/text-plan-maker.types";

import TextPlanMakerStep7 from "./text-plan-maker-step7.component";

const makeSut = (props: TextPlanMakerStepProps) => render(<TextPlanMakerStep7 {...props} />);

describe("TextPlanMakerStep7", () => {
  it("should render component", () => {
    const wrapper = makeSut(mock);
    expect(wrapper).toBeTruthy();
  });

  it("can go to previous step", async () => {
    const { findByTestId } = makeSut(mock);
    const button = await findByTestId("button-back");
    fireEvent.click(button);
    expect(mock.setCurrentStep).toBeCalledWith(5);
  });

  it("can create", async () => {
    const { findByTestId } = makeSut({
      ...mock,
      ideas: "any_ideas",
      thesis: "any_thesis",
      firstArgument: "any_first_argument",
      secondArgument: "any_second_argument",
      agent: "any_agent",
      action: "any_action",
      means: "any_means",
      aim: "any_aim",
    });
    const button = await findByTestId("button-next");
    fireEvent.click(button);
    expect(mock.handleSubmit).toBeCalled();
  });

  it("cannot create when some field not filled", async () => {
    const { findByTestId } = makeSut({
      ...mock,
      ideas: "any_ideas",
      thesis: "any_thesis",
      firstArgument: "any_first_argument",
      secondArgument: "any_second_argument",
      agent: "any_agent",
      means: "any_means",
      aim: "any_aim",
    });
    const button = await findByTestId("button-next");
    fireEvent.click(button);
    expect(mock.handleSubmit).not.toBeCalled();
  });

  it("cannot create when editing", async () => {
    const { findByTestId } = makeSut(mock);
    const buttonEdit = await findByTestId("button-edit");
    fireEvent.click(buttonEdit);
    const buttonNext = await findByTestId("button-next");
    fireEvent.click(buttonNext);
    expect(mock.handleSubmit).not.toBeCalled();
  });
});
