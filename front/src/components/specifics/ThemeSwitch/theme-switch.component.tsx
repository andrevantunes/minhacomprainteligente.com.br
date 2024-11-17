import { SampleProps, Themes, ThemeSwitchProps } from "./theme-switch.types";

import classNames from "classnames";
import { Grid, Radio, setTheme } from "@andrevantunes/andrevds";
import { Card } from "@andrevantunes/andrevds";

const Sample = ({ theme, auto = false, offset = false, className, ...props }: SampleProps) => {
  const cn = classNames(className, "theme-switch__sample", {
    "theme-switch__sample--dark": theme === "dark",
    "theme-switch__sample--light": theme === "light",
    "theme-switch__sample--auto": auto,
    "theme-switch__sample--offset": offset,
  });

  return (
    <div className={cn} {...props}>
      <div className={"theme-switch__sample__first-line"}></div>
      <div className={"theme-switch__sample__second-line"}></div>
    </div>
  );
};

const ThemeSwitch = ({ children, className, ...props }: ThemeSwitchProps) => {
  const cn = classNames("theme-switch", className);

  const handleOnChange = ({ target }: React.ChangeEvent<HTMLInputElement>) => {
    let value = target.value;
    if (value !== "dark" && value !== "light" && value !== "auto") return;
    if (value === "auto") {
      localStorage.removeItem("theme");
    } else {
      setTheme(value);
    }
    window.location.reload();
  };

  const isTheme = (value: Themes) => {
    if (typeof window === "undefined") return false;
    if (value === "auto") return !window.localStorage.getItem("theme");
    return window.localStorage.getItem("theme") === `theme-${value}`;
  };

  return (
    <div className={cn} {...props}>
      {children}
      <Grid columns={{ sm: 3 }}>
        <Card>
          <label
            htmlFor="theme-switch-dark"
            className="theme-switch__label-wrapper"
            data-testid="theme-switch-dark"
          >
            <Radio
              id="theme-switch-dark"
              label="Escuro"
              className="mb-md"
              name="theme"
              value="dark"
              checked={isTheme("dark")}
              onChange={handleOnChange}
            />
            <Sample theme="dark" />
          </label>
        </Card>
        <Card>
          <label
            htmlFor="theme-switch-light"
            className="theme-switch__label-wrapper"
            data-testid="theme-switch-light"
          >
            <Radio
              id="theme-switch-light"
              label="Claro"
              className="mb-md"
              name="theme"
              value="light"
              checked={isTheme("light")}
              onChange={handleOnChange}
            />
            <Sample theme="light" />
          </label>
        </Card>
        <Card>
          <label
            htmlFor="theme-switch-auto"
            className="theme-switch__label-wrapper"
            data-testid="theme-switch-auto"
          >
            <Radio
              id="theme-switch-auto"
              label="Auto"
              className="mb-md"
              name="theme"
              value="auto"
              checked={isTheme("auto")}
              onChange={handleOnChange}
            />
            <Sample theme="light" auto />
            <Sample theme="dark" auto offset />
          </label>
        </Card>
      </Grid>
    </div>
  );
};

export default ThemeSwitch;
