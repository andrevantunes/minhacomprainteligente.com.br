import { Ads } from "@/types";

export const isAdsEnabled = (componentName: string, pathname: string) => {
  return ({ component, routes }: Pick<Ads, "component" | "routes">) => {
    if (component !== componentName && component !== "WithDateRange") return false;
    if (!routes) return true;
    return isRouteEnabled(`${pathname}`, routes);
  };
};

const isRouteEnabled = (pathname: string, routes: string | string[]) => {
  if (typeof routes === "string") return routes === "*" || routes === pathname;
  return routes.includes(pathname);
};
