import type { EssayCorrectedImageProps } from "./essay-corrected-image.types";

import { fireEvent, render } from "@testing-library/react";

import EssayCorrectedImage from "./essay-corrected-image.component";
import { marks } from "../EssayCorrection/essay-correction.mock";

const makeSut = (props?: EssayCorrectedImageProps) => render(<EssayCorrectedImage {...props} />);

const props = {
  marks: marks,
  activeMark: 0,
  full: true,
  setActiveMark: () => {},
  image: "any_image",
  fetching: false,
};

describe("EssayCorrectedImage", () => {
  it("should render component", () => {
    const wrapper = makeSut({ ...props });
    expect(wrapper).toBeTruthy();
  });

  it("should hide marks when click on visibility toggler button", () => {
    const { getByTestId, queryAllByTestId } = makeSut({ ...props });
    const buttonToggleVisibility = getByTestId("visibility-toggler");
    fireEvent.click(buttonToggleVisibility);
    const marks = queryAllByTestId("essay-mark");
    const expected = marks.every((mark) => {
      return mark.classList.contains("essay-corrected-image__container__mark--hidden");
    });
    expect(expected).toBe(true);
  });

  it("should NOT hide marks as default", () => {
    const { queryAllByTestId } = makeSut({ ...props });
    const marks = queryAllByTestId("essay-mark");
    const expected = marks.some((mark) => {
      return mark.classList.contains("essay-corrected-image__container__mark--hidden");
    });

    expect(expected).toBe(false);
  });

  it.each(marks)("should all texts appear in the page", ({ code }) => {
    const { getByText } = makeSut({ ...props });
    getByText(code);
  });
});
