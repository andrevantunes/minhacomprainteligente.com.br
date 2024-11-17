import type { TextProps } from "@/components";
import { TitleProps } from "@/components/adapters/Title";

export interface HeaderSectionProps {
  title?: string | TitleProps;
  subtitle?: string;
  text?: TextProps;
  className?: string;
}
