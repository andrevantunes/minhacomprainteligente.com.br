import type { WithDelayProps } from "./with-delay.types";

import { act, render, waitFor } from "@testing-library/react";

import WithDelay from "./with-delay.component";

const makeSut = (props?: WithDelayProps) =>
  render(
    <WithDelay {...props}>
      <p>OK</p>
    </WithDelay>
  );

describe("WithDelayRender", () => {
  it("should render component", () => {
    const { container } = makeSut();
    expect(container).toBeTruthy();
  });

  it("should render children after 2 seconds", async () => {
    jest.useFakeTimers();
    const { queryByText } = makeSut({ delay: 2000 });

    expect(queryByText("OK")).toBeNull();

    act(() => {
      jest.advanceTimersByTime(1999);
    });

    expect(queryByText("OK")).toBeNull();

    act(() => {
      jest.advanceTimersByTime(1);
    });

    await waitFor(() => {
      expect(queryByText("OK")).not.toBeNull();
    });
  });
});
