import type { ReplacementListProps } from "./replacement-list.types";

import { render } from "@testing-library/react";

import ReplacementList from "./replacement-list.component";

const makeSut = (props?: ReplacementListProps) => render(<ReplacementList {...props} />);

describe("ReplacementList", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
