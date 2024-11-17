import { getFakeApi } from "./api.helpers";

describe("api.helpers", () => {
  it("should return same passed data", async () => {
    const data = await getFakeApi({ someProp: "some-data" });
    expect(data).toMatchObject({ someProp: "some-data" });
  });

  it("should throw error when error equals true", async () => {
    try {
      await getFakeApi({ someProp: "some-data" }, true);
      expect(1).toBe(2);
    } catch (e) {
      expect(e).toEqual(undefined);
    }
  });
});
