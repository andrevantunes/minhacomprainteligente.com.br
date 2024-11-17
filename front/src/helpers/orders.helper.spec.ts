import { LabelThemes, LabelVariants } from "@andrevantunes/andrevds";

import { OrderStatus } from "../types/order.types";
import { getLabelByStatus, parseExpiresAt, serializeUserOrders } from "./orders.helper";

describe("orders", () => {
  describe("getLabelByStatus", () => {
    it("should return empty array if status is falsy", () => {
      const result = getLabelByStatus(null);
      expect(result).toEqual([]);
    });

    it.each(Object.values(OrderStatus))(
      "should return correct label props for each status",
      (status) => {
        const result = getLabelByStatus(status);

        expect(result).toHaveLength(1);
        expect(result[0].theme).toBe(LabelThemes.Ghost);
        expect(
          result[0].variant === LabelVariants.Success ||
            result[0].variant === LabelVariants.Warning ||
            result[0].variant === LabelVariants.Error
        ).toBeTruthy();
        expect(typeof result[0].children).toBe("string");
      }
    );
  });

  describe("parseExpiresAt", () => {
    it("should return a date with the format dd/mm/yyyy prefixed by the correct text", () => {
      const result = parseExpiresAt("2024-01-16T19:52:34.519Z");
      expect(result).toEqual("Expira em 16/01/2024");
    });
  });

  describe("serializeUserOrders", () => {
    it("should serialize correctly", () => {
      const data = [
        {
          name: "Order 1",
          status: "paid",
          accessExpires: "2024-01-16T19:52:34.519Z",
          history: ["1", "2"],
        },
        {
          name: "Order 2",
          status: "gift",
          accessExpires: "2022-12-30T23:59:00.000Z",
          history: ["3", "4"],
        },
      ];

      const paidLabel = getLabelByStatus("paid");
      const giftLabel = getLabelByStatus("gift");

      const result = serializeUserOrders(data);

      expect(result).toEqual({
        orders: [
          {
            title: "Order 1",
            labels: paidLabel,
            expiresAt: "Expira em 16/01/2024",
            history: ["1", "2"],
          },
          {
            title: "Order 2",
            labels: giftLabel,
            expiresAt: "Expira em 30/12/2022",
            history: ["3", "4"],
          },
        ],
      });
    });
  });
});
