import type { AuthModalProps } from "./auth-modal.types";

import { render } from "@testing-library/react";

import AuthModal from "./auth-modal.component";

const makeSut = (props?: AuthModalProps) => render(<AuthModal {...props} />);

const useRouter = jest.spyOn(require("next/router"), "useRouter");

describe("AuthModal", () => {
  beforeAll(() => {
    useRouter.mockImplementation(() => ({
      basePath: "any_basePath",
      asPath: "any_asPath",
      query: {},
    }));
  });

  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });
});
