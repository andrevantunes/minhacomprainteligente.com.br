import type { ReplacementDashboardProps } from "./replacement-dashboard.types";

import { render } from "@testing-library/react";

import ReplacementDashboard from "./replacement-dashboard.component";

const makeSut = (props?: ReplacementDashboardProps) => render(<ReplacementDashboard {...props} />);

describe("ReplacementDashboard", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
