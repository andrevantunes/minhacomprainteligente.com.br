import { Logos } from "@/types";

interface BrandProps {
  className?: string;
  height?: number | string;
}

export interface ProviderDefaultProps {
  brand: {
    logos: Logos;
  };
}

export type { BrandProps };
