import type { EssayTeacherMarkingsProps } from "./essay-teacher-markings.types";

import { render } from "@testing-library/react";

import EssayTeacherMarkings from "./essay-teacher-markings.component";
import { marks } from "../EssayCorrection/essay-correction.mock";

const makeSut = (props?: EssayTeacherMarkingsProps) => render(<EssayTeacherMarkings {...props} />);

const props = { marks: marks, activeMark: 1, setActiveMark: () => {} };

describe("EssayTeacherMarkings", () => {
  it("should render component", () => {
    const wrapper = makeSut({ ...props });
    expect(wrapper).toBeTruthy();
  });

  it("should count 2/4 when passing an array with 4 objects and active mark 1", () => {
    const { getByText } = makeSut({ ...props });
    getByText("2/4");
  });

  it("should disable arrowLeft if the first one is active", () => {
    const { getByTestId } = makeSut({ ...props, activeMark: 0 });
    const buttonArrowLeft = getByTestId("button-arrow-left");
    expect(buttonArrowLeft.disabled).toBe(true);
  });

  it("should NOT disable arrowLeft if the second one is active", () => {
    const { getByTestId } = makeSut({ ...props });
    const buttonArrowLeft = getByTestId("button-arrow-left");
    expect(buttonArrowLeft.disabled).toBe(false);
  });

  it("should disable arrowRight if the last one is active", () => {
    const { getByTestId } = makeSut({ ...props, activeMark: marks.length - 1 });
    const buttonArrowRight = getByTestId("button-arrow-right");
    expect(buttonArrowRight.disabled).toBe(true);
  });

  it("should NOT disable arrowRight if the second-last one is active", () => {
    const { getByTestId } = makeSut({ ...props, activeMark: marks.length - 2 });
    const buttonArrowRight = getByTestId("button-arrow-right");
    expect(buttonArrowRight.disabled).toBe(false);
  });

  it.each(marks)("should all texts appear in the page", ({ code, title, type, comment }) => {
    const { getByText } = makeSut({ ...props });
    getByText(code);
    getByText(title);
    getByText(comment);
  });
});
