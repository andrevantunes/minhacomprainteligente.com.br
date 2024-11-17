import type { MyEssaysSectionProps } from "./my-essays-section.types";

import { render } from "@testing-library/react";

import MyEssaysSection from "./my-essays-section.component";

const makeSut = (props?: MyEssaysSectionProps) => render(<MyEssaysSection {...props} />);

describe("MyEssayList", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
