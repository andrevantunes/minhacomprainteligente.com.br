import type { CarouselProps } from "./carousel.types";

import { render } from "@testing-library/react";

import Carousel from "./carousel.component";

const makeSut = (props?: CarouselProps) => render(<Carousel {...props} />);

describe("Carousel", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
