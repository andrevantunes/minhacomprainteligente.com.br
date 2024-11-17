import config from "@/configs/app.config";

export const PURE_BASE_PATH = config.basePath.replace("/", "");

export const startBasePath = (href: string) => new RegExp(`^\/?${PURE_BASE_PATH}`).test(href);

export const removeBasePath = (href: string) => {
  return href.replace(new RegExp(`^(\/?${PURE_BASE_PATH})+`, "g"), "");
};

export const isExternalLink = (href: string) => href.startsWith("http");

export const ensureStartWithSlash = (href: string) => (href.startsWith("/") ? href : `/${href}`);

export const removeExtraSlash = (href: string) =>
  href.replace(/\/{2,}/g, "/").replace(/(https?:\/)/, "$1/");

export const trimSlashes = (href: string) => href.replace(/^[\/\\]+|[\/\\]+$/g, "");

export const download = (url: string, newWindow = true) => {
  return new Promise<void>((resolve, reject) => {
    try {
      const a = document.createElement("a");
      const fileName = url.split("/").pop();
      if (!fileName) throw new Error("Invalid filename");
      if (newWindow) {
        a.target = "_blank";
      }
      a.href = url;
      a.download = fileName;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      return resolve();
    } catch (e) {
      return reject(e);
    }
  });
};
