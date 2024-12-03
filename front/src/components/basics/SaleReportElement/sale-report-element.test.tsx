import type { SaleReportElementProps } from "./sale-report-element.types";

import { render } from "@testing-library/react";

import SaleReportElement from "./sale-report-element.component";

const makeSut = (props?: SaleReportElementProps) => render(<SaleReportElement {...props} />);

describe("SaleReportElement", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
