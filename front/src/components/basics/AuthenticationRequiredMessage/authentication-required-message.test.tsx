import type { AuthenticationRequiredMessageProps } from "./authentication-required-message.types";

import { render } from "@testing-library/react";

import AuthenticationRequiredMessage from "./authentication-required-message.component";

const makeSut = (props?: AuthenticationRequiredMessageProps) =>
  render(<AuthenticationRequiredMessage {...props} />);

describe("AuthenticationRequiredMessage", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
