import type { ImageProps, SidebarList } from "@andrevantunes/andrevds";
import { RiboConstraints } from "@mesalva/ribo";
import { ReactNode } from "react";

interface Ads {
  routes?: string | string[];
  constraints?: RiboConstraints;
  component?: string;
  children: ReactNode;
  [props: string]: any;
}

export type Logos = {
  enem?: ImageProps;
  med?: ImageProps;
  default?: ImageProps;
};

type MeSalvaAds = Ads[];

interface Platform {
  ads: MeSalvaAds;
  platformSlug: string;
  brand?: {
    logos: Logos;
  };
  links?: any;
  requireLoginSnackBar: [];
  sidebar: SidebarList;
  theme: {
    backgroundImage?: string;
    backgroundColor?: string;
  };
  fetchPlatform?: (platformSlug: string) => Promise<void>;
  setPlatformSlug?: (platformSlug: string) => void;
}

export type { Platform, MeSalvaAds, Ads };
