import type { LoginFormProps } from "./login-form.types";

import { render } from "@testing-library/react";

import LoginForm from "./login-form.component";

const makeSut = (props?: LoginFormProps) => render(<LoginForm {...props} />);

describe("LoginForm", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
