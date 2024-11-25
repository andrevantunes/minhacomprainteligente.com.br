import type { HostHeaderProps } from "./host-header.types";

import { render } from "@testing-library/react";

import HostHeader from "./host-header.component";

const makeSut = (props?: HostHeaderProps) => render(<HostHeader {...props} />);

describe("HostHeader", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
