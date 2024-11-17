import type { WithDateRangeProps } from "./with-date-range.types";

import { render } from "@testing-library/react";

import WithDateRange from "./with-date-range.component";
import { DateTime, Settings } from "luxon";

const makeSut = (props?: WithDateRangeProps) =>
  render(
    <WithDateRange {...props}>
      <p>OK</p>
    </WithDateRange>
  );

const now = "12/04/2023 23:15:30";

describe("WithDateRange", () => {
  beforeEach(() => {
    const expectedNow = DateTime.local(2023, 4, 12, 23, 15, 30);
    Settings.now = () => expectedNow.toMillis();
  });

  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });

  it("should render children when within range () (date)", () => {
    const { queryByText } = makeSut({
      startDate: "12/04/2023",
      endDate: "15/04/2023",
    });
    expect(queryByText("OK")).not.toBeNull();
  });

  it("should NOT render children when within range (date)", () => {
    const { queryByText } = makeSut({
      startDate: "01/04/2023",
      endDate: "12/04/2023",
    });
    expect(queryByText("OK")).toBeNull();
  });

  it("should render children when within range (date)", () => {
    const { queryByText } = makeSut({
      startDate: "01/04/2023",
      endDate: "12/04/2023",
      outside: true,
    });
    expect(queryByText("OK")).not.toBeNull();
  });

  it("should NOT render children when within range (date)", () => {
    const { queryByText } = makeSut({
      startDate: "13/04/2023",
      endDate: "15/04/2023",
    });
    expect(queryByText("OK")).toBeNull();
  });

  it("should NOT render children when within range (date)", () => {
    const { queryByText } = makeSut({
      startDate: "01/04/2023",
      endDate: "11/04/2023",
    });
    expect(queryByText("OK")).toBeNull();
  });

  it("should NOT render children when within range (date)", () => {
    const { queryByText } = makeSut({
      startDate: "12/04/2023 23:16",
      endDate: "15/04/2023 23:30",
    });
    expect(queryByText("OK")).toBeNull();
  });

  it("should render children when within range (date)", () => {
    const { queryByText } = makeSut({
      startDate: "12/04/2023 23:16",
      endDate: "15/04/2023 23:30",
      outside: true,
    });
    expect(queryByText("OK")).not.toBeNull();
  });

  it("should NOT render children when within range (date)", () => {
    const { queryByText } = makeSut({
      startDate: "12/04/2023 23:10",
      endDate: "12/04/2023 23:14",
    });
    expect(queryByText("OK")).toBeNull();
  });

  it("should render children when within range (date time seconds)", () => {
    const { queryByText } = makeSut({
      startDate: "12/04/2023 23:15:00",
      endDate: "12/04/2023 23:15:45",
    });
    expect(queryByText("OK")).not.toBeNull();
  });

  it("should NOT render children when within range (date time seconds)", () => {
    const { queryByText } = makeSut({
      startDate: "12/04/2023 23:15:00",
      endDate: "12/04/2023 23:15:45",
      outside: true,
    });
    expect(queryByText("OK")).toBeNull();
  });

  it("should render children when within range (date time seconds)", () => {
    const { queryByText } = makeSut({
      startDate: "12/04/2023 23:15:30",
      endDate: "12/04/2023 23:15:30",
    });
    expect(queryByText("OK")).not.toBeNull();
  });

  it("should NOT render children when outside range (date time seconds)", () => {
    const { queryByText } = makeSut({
      startDate: "12/04/2023 23:15:31",
      endDate: "12/04/2023 23:15:44",
    });
    expect(queryByText("OK")).toBeNull();
  });

  it("should NOT render children when outside range (date time seconds)", () => {
    const { queryByText } = makeSut({
      startDate: "12/04/2023 23:15:10",
      endDate: "12/04/2023 23:15:29",
    });
    expect(queryByText("OK")).toBeNull();
  });

  it("should work with ISO format (date time seconds)", () => {
    const { queryByText } = makeSut({
      startDate: "2023-04-12T23:15:10",
      endDate: "2023-04-12T23:15:29",
      fromISO: true,
    });
    expect(queryByText("OK")).toBeNull();
  });

  it("should work with ISO format (date time seconds)", () => {
    const { queryByText } = makeSut({
      startDate: "2023-04-12T23:15:31",
      endDate: "2023-04-12T23:15:45",
      fromISO: true,
    });
    expect(queryByText("OK")).toBeNull();
  });

  it("should work with ISO format (date time seconds)", () => {
    const { queryByText } = makeSut({
      startDate: "2023-04-12T23:15:10",
      endDate: "2023-04-12T23:15:29",
      fromISO: true,
      outside: true,
    });
    expect(queryByText("OK")).not.toBeNull();
  });

  it("should work with ISO format (date time seconds)", () => {
    const { queryByText } = makeSut({
      startDate: "2023-04-12T23:15:31",
      endDate: "2023-04-12T23:15:45",
      fromISO: true,
      outside: true,
    });
    expect(queryByText("OK")).not.toBeNull();
  });
});
