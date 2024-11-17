import { camelToSnakeCase, getLetterFromNumber } from "./strings.helper";

describe("strings", () => {
  describe("camelToSnakeCase", () => {
    it("should return empty string if input is empty", () => {
      let result: string = camelToSnakeCase("");
      expect(result).toBe("");
    });

    it("should work with lowerCamelCase", () => {
      let result: string = camelToSnakeCase("fieldName");
      expect(result).toBe("field_name");
    });

    it("should work with UpperCamelCase/PascalCase", () => {
      let result: string = camelToSnakeCase("FieldName");
      expect(result).toBe("field_name");
    });
  });

  describe("getLetterFromNumber", () => {
    it.each([
      [0, false, "a"],
      [1, false, "b"],
      [19, false, "t"],
      [25, false, "z"],
      [0, true, "A"],
      [1, true, "B"],
      [19, true, "T"],
      [25, true, "Z"],
    ])("getLetterFromNumber(%i, %i)", (passed, upperCase, expected) => {
      expect(getLetterFromNumber(passed, upperCase)).toBe(expected);
    });
  });
});
