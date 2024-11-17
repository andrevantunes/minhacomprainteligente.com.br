import type {
  DropdownActionAdapterProps,
  DropDownItemProps,
} from "./dropdown-action-adapter.types";

import { fireEvent, render } from "@testing-library/react";

import * as Controllers from "../../../controllers";
import DropdownActionAdapter from "./dropdown-action-adapter.component";

jest.mock("../../../controllers", () => ({
  acceptPersona: jest.fn().mockResolvedValue(true),
  rejectPersona: jest.fn().mockResolvedValue(true),
}));

const dropdownList: DropDownItemProps[] = [
  { label: "Label 1", action: "rejectPersona", successText: "success", errorText: "error" },
  { label: "Label 2", action: "acceptPersona", successText: "success", errorText: "error" },
];

const makeSut = (props?: DropdownActionAdapterProps) =>
  render(<DropdownActionAdapter list={dropdownList} {...props} />);

describe("DropdownActionAdapter", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toBeTruthy();
  });

  it("should execute rejectPersona action when click on the list", () => {
    const wrapper = makeSut();
    const button = wrapper.getByTestId("toggle-dropdown-button");
    fireEvent.click(button);
    const dropDownMenuItem = wrapper.queryByText("Label 1");

    const actionSpy = jest.spyOn(Controllers, "rejectPersona").mockResolvedValue(undefined);
    if (!dropDownMenuItem) throw new Error("Element not found");
    fireEvent.click(dropDownMenuItem);
    expect(actionSpy).toHaveBeenCalled();
  });

  it("should execute acceptPersona action when click on the list", () => {
    const wrapper = makeSut();
    const button = wrapper.getByTestId("toggle-dropdown-button");
    fireEvent.click(button);
    const dropDownMenuItem = wrapper.queryByText("Label 2");
    const actionSpy = jest.spyOn(Controllers, "acceptPersona").mockResolvedValue(undefined);
    if (!dropDownMenuItem) throw new Error("Element not found");
    fireEvent.click(dropDownMenuItem);
    expect(actionSpy).toHaveBeenCalled();
  });
});
