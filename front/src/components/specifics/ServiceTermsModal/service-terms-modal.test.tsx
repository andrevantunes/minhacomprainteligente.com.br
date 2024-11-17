import type { ServiceTermsModalProps } from "./service-terms-modal.types";
import "@testing-library/jest-dom";
import { render } from "@testing-library/react";

import ServiceTermsModal from "./service-terms-modal.component";
import { parse } from "./service-terms-modal.helpers";

const makeSut = (props: ServiceTermsModalProps) => render(<ServiceTermsModal {...props} />);

jest.mock("../../../requests", () => ({
  updateSetting: jest.fn().mockResolvedValue(true),
}));

const props = {
  title: "any_title",
  text: "any_text",
  label: "any_label",
  version: "2.0",
};

describe("ServiceTermsModal", () => {
  describe("helper", () => {
    it("parser", async () => {
      const json = [
        {
          component: "Button",
          id: "button-confirm-agree-terms",
        },
        {
          component: "ItemCheckbox",
          id: "checkbox-agree-terms",
        },
        {
          component: "div",
          children: "Batata",
        },
      ];

      expect(
        typeof parse(
          json,
          true,
          true,
          () => {},
          () => {}
        )?.[0]?.onClick === "function"
      ).toBe(true);

      expect(
        typeof parse(
          json,
          true,
          true,
          () => {},
          () => {}
        )?.[1]?.onChange === "function"
      ).toBe(true);

      expect(
        parse(
          json,
          true,
          true,
          () => {},
          () => {}
        )?.[1]?.checked
      ).toBe(true);
    });
  });
});
