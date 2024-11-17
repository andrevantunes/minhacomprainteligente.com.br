import { getUser } from "@/helpers/user.helper";
import { initialFetchState } from "@/store";
import { PlatformContextProviderValue } from "./platform-context.types";

export const DEFAULT_PLATFORM_SLUG = "enem-e-vestibulares";

export const defaultPlatformContextValue: PlatformContextProviderValue = {
  platformSlug: DEFAULT_PLATFORM_SLUG,
  requireLoginSnackBar: [],
  ads: [],
  brand: undefined,
  sidebar: [],
  theme: {},
  ...initialFetchState,
};

export const getPlatformSlug = (platformSlug?: string | string[]) => {
  if (typeof platformSlug === "string") return platformSlug;
  try {
    return getUser().platformSlug || DEFAULT_PLATFORM_SLUG;
  } catch (error) {
    return DEFAULT_PLATFORM_SLUG;
  }
};
