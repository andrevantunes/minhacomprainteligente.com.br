import { NextRouter } from "next/router";

export const pushWithParameters = (router: NextRouter) => {
  const { path = "/", sign, content, ...currentQueryParams } = router.query;
  const hasParams = Object.keys(currentQueryParams).length > 0;
  const params = new URLSearchParams(currentQueryParams as Record<string, string>);
  const newUrl = `${path}${hasParams ? "?" : ""}${params.toString()}`;
  router.push(newUrl);
};
