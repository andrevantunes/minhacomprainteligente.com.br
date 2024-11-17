import * as Controllers from "../controllers";
import { Notification } from "@andrevantunes/andrevds";
import { handlePersonaActions } from "./persona.helper";

jest.mock("../controllers", () => ({
  acceptPersona: jest.fn().mockResolvedValue(true),
  rejectPersona: jest.fn().mockResolvedValue(true),
}));

jest.mock("@andrevantunes/andrevds", () => ({
  Notification: {
    error: jest.fn(),
    success: jest.fn(),
  },
}));

const successText = "any_success_message";
const errorText = "any_error_message";

const successNotificationSpy = jest.spyOn(Notification, "success");
const errorNotificationSpy = jest.spyOn(Notification, "error");

const actionNames = ["rejectPersona", "acceptPersona"];

describe("handlePersonaActions", () => {
  it("should notify error if action name is not found", async () => {
    const input = { action: "not_found_action", successText, errorText };
    const response = await handlePersonaActions(input);

    expect(response).toBeUndefined();

    expect(errorNotificationSpy).toHaveBeenCalledTimes(1);
    expect(errorNotificationSpy).toHaveBeenCalledWith(errorText);
  });

  describe.each(actionNames)("When action is %s", (action) => {
    beforeEach(() => jest.clearAllMocks());

    it("should returns success notification", async () => {
      // @ts-ignore
      const actionSpy = jest.spyOn(Controllers, action).mockResolvedValue(undefined);

      await handlePersonaActions({ action, successText, errorText });
      expect(actionSpy).toHaveBeenCalled();

      expect(errorNotificationSpy).not.toHaveBeenCalled();
      expect(successNotificationSpy).toHaveBeenCalledTimes(1);
      expect(successNotificationSpy).toHaveBeenCalledWith(successText);
    });

    it("should returns error notification", async () => {
      // @ts-ignore
      const actionSpy = jest.spyOn(Controllers, action).mockRejectedValue(undefined);

      await handlePersonaActions({ action, successText, errorText });
      expect(actionSpy).toHaveBeenCalled();

      expect(successNotificationSpy).not.toHaveBeenCalled();
      expect(errorNotificationSpy).toHaveBeenCalledTimes(1);
      expect(errorNotificationSpy).toHaveBeenCalledWith(errorText);
    });
  });
});
