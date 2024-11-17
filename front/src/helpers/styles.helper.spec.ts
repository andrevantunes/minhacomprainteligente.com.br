import { parseNumericValue } from "./styles.helper";

describe("parseNumericValue", () => {
  it("should return the same value if is NOT a number", () => {
    expect(parseNumericValue(undefined)).toBeUndefined();
    expect(parseNumericValue("300px")).toBe("300px");
  });

  it("should return a pixel value if is a number", () => {
    expect(parseNumericValue(300)).toBe("300px");
    expect(parseNumericValue("300")).toBe("300px");
  });
});
