import type { WithRouterProps } from "./with-router.types";

import { render } from "@testing-library/react";
import WithRouter from "./with-router.component";

jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "/any-path",
      basePath: "/app",
    };
  },
}));

const makeSut = (props?: WithRouterProps) =>
  render(
    <WithRouter {...props}>
      <p>OK</p>
    </WithRouter>
  );

describe.skip("WithMatchRoute", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });

  it("should contain children", () => {
    const { container } = makeSut({
      include: ["/app/any-path"],
    });

    expect(container.childElementCount).toBe(1);
  });

  it("should NOT contain children", () => {
    const { container } = makeSut({
      include: ["/App/any-path"],
    });

    expect(container.childElementCount).toBe(0);
  });

  it("should allow wildcard", () => {
    const { container } = makeSut({
      include: ["/app/any-path/*"],
    });

    expect(container.childElementCount).toBe(1);
  });

  it("should can ignore some paths", () => {
    const { container } = makeSut({
      include: ["/app/*"],
      exclude: ["/app/some/irrelevant-path", "/app/any-path"],
    });

    expect(container.childElementCount).toBe(0);
  });
});
