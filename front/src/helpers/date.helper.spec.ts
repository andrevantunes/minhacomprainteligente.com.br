import { dateBr, dateBrFull, hourBr, objectFieldsToDate } from "./date.helper";

describe("date-helpers", () => {
  describe("date", () => {
    beforeAll(() => {
      Date.prototype.getTimezoneOffset = jest.fn(() => 0);
    });

    const dateString = "2022-02-01T17:49:55.000Z";

    describe("dateBr", () => {
      it("format date as br with timezone", () => {
        expect(dateBr(dateString)).toBe("01/02 • 14:49");
      });
    });

    describe("dateBrFull", () => {
      it("format date as br with timezone", () => {
        expect(dateBrFull(dateString)).toBe("01/02/2022 • 14:49");
      });
    });

    describe("hourBr", () => {
      it("format hour as br with timezone", () => {
        expect(hourBr(dateString)).toBe("14:49");
      });
    });

    describe("objectFieldsToDate", () => {
      describe("when receive an object", () => {
        it("transform field to date", () => {
          expect(objectFieldsToDate({ dateString }, "dateString")).toEqual({
            dateString: new Date(dateString),
          });
        });
      });
      describe("when receive an array of objects", () => {
        it("transform field to date", () => {
          expect(objectFieldsToDate([{ dateString }], "dateString")).toEqual([
            { dateString: new Date(dateString) },
          ]);
        });
      });
    });
  });
});
