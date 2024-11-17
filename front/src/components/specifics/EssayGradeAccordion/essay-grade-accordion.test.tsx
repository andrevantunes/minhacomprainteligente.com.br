import type { EssayGradeAccordionProps } from "./essay-grade-accordion.types";

import { fireEvent, render } from "@testing-library/react";

import EssayGradeAccordion from "./essay-grade-accordion.component";

const PROPS = {
  criterium: "any_criterium",
  description: "any_description",
  grade: "120",
  content: "accordion-content",
};

const children = "any_children";
const testId = "any_test_id";
const gradeTestId = "grade";

const makeSut = (props?: EssayGradeAccordionProps) =>
  render(
    <EssayGradeAccordion data-testid={testId} {...props}>
      {children}
    </EssayGradeAccordion>
  );

describe("<EssayGradeAccordion>", () => {
  it("should render component", () => {
    const { getByText, getByTestId } = makeSut({ ...PROPS });
    getByText(PROPS.criterium);
    getByText(children);
    const component = getByTestId(testId);
    expect(component.className).toBe("accordion essay-grade-accordion");
  });

  it("should open accordion", () => {
    const { getByText, getByTestId } = makeSut({ ...PROPS });
    const header = getByText(PROPS.criterium);
    const content = getByTestId(PROPS.content);
    const component = getByTestId(testId);

    expect(component.className).not.toContain("is-open");
    expect(content.style.height).toBe("0px");

    fireEvent.click(header);

    expect(component.className).toContain("is-open");
    expect(content.style.height).toBe("auto");
  });

  it("should close accordion", async () => {
    const { getByText, getByTestId, findByTestId } = makeSut({ ...PROPS, defaultOpen: true });
    const header = getByText(PROPS.criterium);
    const content = getByTestId(PROPS.content);
    const component = await findByTestId(testId);

    expect(component.className).toContain("is-open");
    expect(content.style.height).toBe("auto");

    fireEvent.click(header);

    expect(component.className).not.toContain("is-open");
    expect(content.style.height).toBe("0px");
  });
});
