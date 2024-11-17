import type { AccordionProps } from "./accordion.types";

import { render } from "@testing-library/react";

import Accordion from "./accordion.component";

const makeSut = (props?: AccordionProps) => render(<Accordion {...props} />);

describe("Accordion", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
