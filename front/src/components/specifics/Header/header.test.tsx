import { render, fireEvent } from "@testing-library/react";

import Header from "./header.component";
import { SidebarManager } from "@/components";

const makeSut = () => render(<Header />);

describe("<Header>", () => {
  it("should render component", () => {
    const wrapper = makeSut();
    expect(wrapper).toMatchSnapshot();
  });

  it('should has "header header--is-going-up" className on initial render component', () => {
    const wrapper = makeSut();
    const header = wrapper.getByTestId("header");
    const className = "header header--is-going-up";
    expect(header.className).toBe(className);
  });

  it("should call Sidebar.open when toggle button is clicked", () => {
    const openSidebarSpy = jest.spyOn(SidebarManager, "open");
    const wrapper = makeSut();

    const button = wrapper.getByTestId("open-sidebar-button");
    fireEvent.click(button);

    expect(openSidebarSpy).toHaveBeenCalledTimes(1);
  });
});
