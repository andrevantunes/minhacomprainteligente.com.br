import type { EssayFinalGradeProps } from "./essay-final-grade.types";

import { render } from "@testing-library/react";

import EssayFinalGrade from "./essay-final-grade.component";

const props = {
  finalGrade: 500,
  maxGrade: 1000,
};

const makeSut = (props: EssayFinalGradeProps) => render(<EssayFinalGrade {...props} />);

describe("EssayFinalGrade", () => {
  it("should render component", () => {
    const wrapper = makeSut(props);
    expect(wrapper).toBeTruthy();
  });
});
