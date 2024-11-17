import type { ThemeSwitchProps } from "./theme-switch.types";

import { render } from "@testing-library/react";

import ThemeSwitch from "./theme-switch.component";

const makeSut = (props?: ThemeSwitchProps) => render(<ThemeSwitch {...props} />);

describe("ThemeSwitch", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
