import { fireEvent, render } from "@testing-library/react";
import { textPlanMakerPropsMock as mock } from "../TextPlanMaker/text-plan-maker.test";
import { TextPlanMakerStepProps } from "../TextPlanMaker/text-plan-maker.types";

import TextPlanMakerStep3 from "./text-plan-maker-step3.component";

const makeSut = (props: TextPlanMakerStepProps) => render(<TextPlanMakerStep3 {...props} />);

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "/any-path",
      basePath: "/app",
    };
  },
}));

describe("TextPlanMakerStep3", () => {
  it("should render component", () => {
    const wrapper = makeSut(mock);
    expect(wrapper).toBeTruthy();
  });

  it("can go to previous step", async () => {
    const { findByTestId } = makeSut(mock);
    const button = await findByTestId("button-back");
    fireEvent.click(button);
    expect(mock.setCurrentStep).toBeCalledWith(1);
  });

  it("can go to next step", async () => {
    const { findByTestId } = makeSut({ ...mock, thesis: "any_text" });
    const button = await findByTestId("button-next");
    fireEvent.click(button);
    expect(mock.setCurrentStep).toBeCalledWith(3);
  });

  it("cannot go to next step", async () => {
    const { findByTestId } = makeSut(mock);
    const button = await findByTestId("button-next");
    fireEvent.click(button);
    expect(mock.setCurrentStep).not.toBeCalled();
  });
});
