import type { DismissedWrapperProps } from "./dismissed-wrapper.types";

import { render } from "@testing-library/react";

import DismissedWrapper from "./dismissed-wrapper.component";

const makeSut = (props?: DismissedWrapperProps) => render(<DismissedWrapper {...props} />);

describe("DismissedWrapper", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
