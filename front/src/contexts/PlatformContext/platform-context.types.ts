import type { FetchState } from "@/store";
import type { Platform } from "@/types";
import type { ReactNode } from "react";

interface PlatformContextProviderProps {
  children: ReactNode;
}

type PlatformContextProviderValue = Platform & FetchState;

export type { PlatformContextProviderProps, PlatformContextProviderValue };
