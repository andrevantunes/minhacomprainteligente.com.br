import { PlatformContext } from "@/contexts/PlatformContext";
import { Card, CardElevations } from "@andrevantunes/andrevds";
import classNames from "classnames";
import { useContext } from "react";

import { AuthTemplateProps } from "./auth-template.types";

const AuthTemplate = ({ children, className }: AuthTemplateProps) => {
  const { theme } = useContext(PlatformContext);

  const themeStyle = {
    backgroundColor: theme.backgroundColor,
    backgroundImage: theme.backgroundImage ? `url(${theme.backgroundImage})` : undefined,
  };

  const cn = classNames("auth-template", className);
  return (
    <div className={cn} style={themeStyle}>
      <Card elevation={CardElevations.Medium}>{children}</Card>
    </div>
  );
};

export default AuthTemplate;
