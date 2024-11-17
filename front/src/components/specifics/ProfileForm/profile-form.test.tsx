import React from "react";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import * as GlobalStore from "@/store/store.global";
import * as UserStore from "@/store/UserStore/user-store.action";
import { defaultState } from "@/store/UserStore/user-store.state";
import { profileInDictionary } from "./profile-form.validation";
import { userMock } from "./profile-form.helper";
import ProfileForm from "./profile-form.component";
import { Notification } from "@andrevantunes/andrevds";

jest.mock("@/requests/profile.request", () => ({
  getProfileEducation: async () => jest.fn().mockReturnValue({ educations: [], objectives: [] }),
  recoverPassword: async () => jest.fn(),
}));

const successNotificationSpy = jest.spyOn(Notification, "success");
const errorNotificationSpy = jest.spyOn(Notification, "error");
const updateProfileSpy = jest.spyOn(UserStore, "updateProfile");

const makeGetUserStore = (user = defaultState.user) =>
  jest.spyOn(GlobalStore, "getStore").mockReturnValue(user);

const makeSut = () => render(<ProfileForm />);

describe("<ProfileForm>", () => {
  beforeEach(() => {
    jest.resetAllMocks();
    updateProfileSpy.mockResolvedValue();
    makeGetUserStore(userMock);
  });

  describe("without default values", () => {
    beforeEach(() => makeGetUserStore());

    it("render component", () => {
      const wrapper = makeSut();
      expect(wrapper).toMatchSnapshot();
    });

    it("change input value", async () => {
      makeSut();
      const value = "New Name";
      const inputName = changeInputValueByLabel(value, profileInDictionary.name.label);
      await waitFor(() => {
        expect(inputName.value).toBe(value);
      });
    });
  });

  describe("with default values", () => {
    it("render component", () => {
      const wrapper = makeSut();
      expect(wrapper).toMatchSnapshot();
    });

    it("update profile on success", async () => {
      const wrapper = makeSut();
      const name = "New Name";
      changeInputValueByLabel(name, profileInDictionary.name.label);
      const submitButton = wrapper.getByText(profileInDictionary.submit.label);
      fireEvent.click(submitButton);
      await waitFor(() => {
        expect(updateProfileSpy).toBeCalledTimes(1);
        expect(updateProfileSpy).toBeCalledWith({
          birthDate: "18-03-1995",
          educationLevelId: undefined,
          enemSubscriptionId: null,
          image: null,
          name,
          objectiveId: undefined,
          phone: "(51)999999999",
        });

        expect(successNotificationSpy).toBeCalledTimes(1);
        expect(successNotificationSpy).toBeCalledWith("Dados salvos com sucesso");
      });
    });

    it("update profile on error", async () => {
      updateProfileSpy.mockRejectedValue("");
      const wrapper = makeSut();
      const submitButton = wrapper.getByText(profileInDictionary.submit.label);
      fireEvent.click(submitButton);
      await waitFor(() => {
        expect(updateProfileSpy).toBeCalledTimes(1);
        expect(errorNotificationSpy).toBeCalledTimes(1);
        expect(errorNotificationSpy).toBeCalledWith("Não foi possível salvar os dados");
      });
    });
  });
});

const changeInputValueByLabel = (value: string, label: string) => {
  const input = screen.getByLabelText(label);
  fireEvent.change(input, { target: { value } });
  return input as HTMLInputElement;
};
