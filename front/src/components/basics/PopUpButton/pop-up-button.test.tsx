import type { PopUpButtonProps } from "./pop-up-button.types";

import { fireEvent, render, screen } from "@testing-library/react";

import PopUpButton from "./pop-up-button.component";
import { Modal } from "@andrevantunes/andrevds";

jest.mock("../../adapters/Ribo/ribo.component", () => ({ children }: any) => <>{children}</>);
jest.mock("../../adapters/Button/button.component", () => (props: any) => <button {...props} />);

const DATA = {
  BUTTON_TEST_ID: "open-pop-up-button",
  BUTTON_CLOSE: "close_button",
};

const openModalSpy = jest.spyOn(Modal, "open");
const makeSut = (props?: PopUpButtonProps) => render(<PopUpButton {...props} />);

const popUpButton = {
  children: DATA.BUTTON_CLOSE,
  action: "close",
};
const popUp = {
  children: "any_content",
  buttons: [popUpButton],
};

describe("PopUpButton", () => {
  describe("when not has popUp props", () => {
    it("should disabled button", () => {
      makeSut();
      const { button } = openModal();
      expect(button.disabled).toBeTruthy();
      expect(openModalSpy).not.toBeCalled();
    });
  });

  describe("when pass popUp props", () => {
    it("should open modal on click button", () => {
      makeSut({ popUp });
      const { button } = openModal();
      expect(button.disabled).toBeFalsy();
      expect(openModalSpy).toBeCalled();
      closeModal();
    });

    it("should open modal with content", () => {
      const wrapper = makeSut({ popUp });
      openModal();
      wrapper.getByText(popUp.children);
      wrapper.getByText(popUpButton.children);
      closeModal();
    });

    it("should close modal by action", () => {
      const wrapper = makeSut({ popUp });
      openModal();
      wrapper.getByText(popUp.children);
      closeModal();
      const modalContent = screen.queryByText(popUp.children);
      expect(modalContent).toBeNull();
    });
  });
});

function openModal() {
  const button = screen.getByTestId(DATA.BUTTON_TEST_ID) as HTMLButtonElement;
  fireEvent.click(button);
  return { button };
}

function closeModal() {
  const closeButton = screen.queryByText(DATA.BUTTON_CLOSE) as HTMLButtonElement;
  fireEvent.click(closeButton);
  return { closeButton };
}
