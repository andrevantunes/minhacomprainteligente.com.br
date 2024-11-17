import type { HTMLAttributes, HTMLProps, PropsWithChildren } from "react";

interface ThemeSwitchProps extends PropsWithChildren<HTMLProps<HTMLDivElement>> {}

export type Themes = "light" | "dark" | "auto";

interface SampleProps extends HTMLAttributes<HTMLDivElement> {
  theme: Themes;
  auto?: boolean;
  offset?: boolean;
}

export type { ThemeSwitchProps, SampleProps };
