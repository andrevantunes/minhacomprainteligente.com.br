import type { HTMLProps, PropsWithChildren } from "react";

interface ServiceTermsModalProps
  extends Omit<PropsWithChildren<HTMLProps<HTMLDivElement>>, "label" | "size"> {
  version: string;
  json: string;
  successText?: string;
}

export type { ServiceTermsModalProps };
