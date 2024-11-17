import config from "../configs/app.config";
import {
  ensureStartWithSlash,
  isExternalLink,
  removeBasePath,
  removeExtraSlash,
  startBasePath,
  PURE_BASE_PATH,
  trimSlashes,
} from "./links.helpers";

const { basePath, panel } = config;
describe("links.helpers", () => {
  describe("ensureStartWithSlash", () => {
    it.each(["some-path", "some/path"])("include slash: %s", (href) => {
      expect(ensureStartWithSlash(href)).toBe(`/${href}`);
    });

    it.each(["/some-path", "/some/path"])("do nothing: %s", (href) => {
      expect(ensureStartWithSlash(href)).toBe(href);
    });
  });

  describe("isExternalLink", () => {
    it.each(["/cadastro", "/app/vestivulares", "/app/painel"])("false: %s", (path) => {
      expect(isExternalLink(path)).toBeFalsy();
    });

    it.each([
      "https://google.com",
      "http://facebook.com",
      "https://www.mesalva.com",
      "http://mesalva.com",
    ])("true: %s", (path) => {
      expect(isExternalLink(path)).toBeTruthy();
    });
  });

  describe("removeBasePath", () => {
    it.each([
      [`/some/path`, "/some/path"],
      [`${basePath}/some/path`, "/some/path"],
      [`${basePath}${basePath}/some/path`, "/some/path"],
      [`${basePath}${basePath}${basePath}/some/path`, "/some/path"],
      [`${basePath}/entrar?path=${basePath}${panel}`, `/entrar?path=${basePath}${panel}`],
    ])(`remove ${basePath} of %s`, (input, output) => {
      expect(removeBasePath(input)).toBe(output);
    });
  });

  describe("removeExtraSlash", () => {
    it.each(["/some/path", "//some/path", "///some/path", "/some//path"])(
      `remove extra slash of %s`,
      (path) => {
        expect(removeExtraSlash(path)).toBe("/some/path");
      }
    );

    it.each(["https://some.path", "http://some.path"])("don't remove from http(s)://", (url) => {
      expect(removeExtraSlash(url)).toBe(url);
    });

    it("don't remove from http(s)://", () => {
      expect(removeExtraSlash("https://some.path//a/b")).toBe("https://some.path/a/b");
    });
  });

  describe("startBasePath", () => {
    it.each(["some-path", `/some/path`, `some/path`])("false: %s", (path) => {
      expect(startBasePath(path)).toBeFalsy();
    });

    it.each([`${basePath}/some/path`, `${PURE_BASE_PATH}/some/path`])("true: %s", (path) => {
      expect(startBasePath(path)).toBeTruthy();
    });
  });

  describe("trimSlashes", () => {
    it.each([
      {
        actual: "///\\/\\/anydomain.com///\\/\\/",
        expected: "anydomain.com",
      },
    ])("trim any slashes", ({ actual, expected }) => {
      expect(trimSlashes(actual)).toBe(expected);
    });
  });
});
