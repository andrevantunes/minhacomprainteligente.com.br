import { StoreType, useStore } from "@/store";
import { Platform } from "@/types";
import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import { defaultPlatformContextValue, getPlatformSlug } from "./platform-context.helpers";
import {
  PlatformContextProviderProps,
  PlatformContextProviderValue,
} from "./platform-context.types";

export const PlatformContext = createContext<PlatformContextProviderValue>(
  defaultPlatformContextValue
);

const PlatformContextProvider = ({ children }: PlatformContextProviderProps) => {
  const [{ guest }] = useStore(StoreType.User);
  const router = useRouter();

  const [fetching] = useState(false);
  const [fetched, setFetched] = useState(false);

  const [platform] = useState<Platform | null>(null);
  const [platformSlug, setPlatformSlug] = useState(defaultPlatformContextValue.platformSlug);

  useEffect(() => {
    const newPlatformSlug = getPlatformSlug(router.query.platformSlug);
    if (platformSlug !== newPlatformSlug) setPlatformSlug(newPlatformSlug);
  }, [guest, router.query.platformSlug]);

  const fetchPlatform = async (_slug?: string) => {
    setFetched(true);
  };

  useEffect(() => {
    fetchPlatform();
  }, [platformSlug]);

  const value: PlatformContextProviderValue = {
    fetchPlatform,
    setPlatformSlug,
    ads: [],
    requireLoginSnackBar: [],
    platformSlug,
    brand: undefined,
    sidebar: [],
    theme: {},
    links: {},
    ...platform,
    fetched,
    fetching,
    error: false,
  };

  return <PlatformContext.Provider value={value}>{children}</PlatformContext.Provider>;
};

export default PlatformContextProvider;
