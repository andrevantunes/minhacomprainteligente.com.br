import { isAdsEnabled } from "./ads.helper";

describe("ads.helper", () => {
  describe("isAdsEnabled", () => {
    describe("returns FALSE", () => {
      it("when not has the same component name", () => {
        const callback = isAdsEnabled("any-component-name", "any-path");
        const result = callback({ component: "another-component", routes: undefined });
        expect(result).toBeFalsy();
      });

      it("when not match any routes (1)", () => {
        const componentName = "valid-component-name";
        const callback = isAdsEnabled(componentName, "any-path");
        const result = callback({ component: componentName, routes: "another-path" });
        expect(result).toBeFalsy();
      });

      it("when not match any routes (2)", () => {
        const componentName = "valid-component-name";
        const callback = isAdsEnabled(componentName, "any-path");
        const routes = ["another-path-1", "another-path-2"];
        const result = callback({ component: componentName, routes });
        expect(result).toBeFalsy();
      });
    });

    describe("returns TRUE", () => {
      it("when has the same component name", () => {
        const componentName = "valid-component-name";
        const callback = isAdsEnabled(componentName, "any-path");
        const result = callback({ component: componentName, routes: undefined });
        expect(result).toBeTruthy();
      });

      it("when route is equal to '*'", () => {
        const componentName = "valid-component-name";
        const callback = isAdsEnabled(componentName, "any-path");
        const result = callback({ component: componentName, routes: "*" });
        expect(result).toBeTruthy();
      });

      it("when match any routes (1)", () => {
        const componentName = "valid-component-name";
        const routeName = "same-pathname";
        const callback = isAdsEnabled(componentName, routeName);
        const result = callback({ component: componentName, routes: routeName });
        expect(result).toBeTruthy();
      });

      it("when match any routes (2)", () => {
        const componentName = "valid-component-name";
        const routeName = "same-pathname";
        const callback = isAdsEnabled(componentName, routeName);
        const routes = ["another-path", routeName];
        const result = callback({ component: componentName, routes });
        expect(result).toBeTruthy();
      });
    });
  });
});
