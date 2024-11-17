import { notifyError, notifySuccess } from "./notify.helper";
import { Notification } from "@andrevantunes/andrevds";

const openNotificationSpy = jest.spyOn(Notification, "open");
const content = "any-error-message";

describe("notify.helper", () => {
  describe("notifyError", () => {
    it("should call Notification.open", () => {
      notifyError(content);
      expect(openNotificationSpy).toBeCalledTimes(1);
      expect(openNotificationSpy).toBeCalledWith({ content, variant: "error" });
    });
  });

  describe("notifySuccess", () => {
    it("should call Notification.open", () => {
      notifySuccess(content);
      expect(openNotificationSpy).toBeCalledTimes(1);
      expect(openNotificationSpy).toBeCalledWith({ content, variant: "success" });
    });
  });
});
