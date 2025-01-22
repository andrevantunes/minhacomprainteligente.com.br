import type { AuthenticationRequiredMessageProps } from "./authentication-required-message.types";

import classNames from "classnames";
import { Button } from "@/components";
import { getURLLogin } from "@/helpers/login.helper";

const AuthenticationRequiredMessage = ({
  children,
  className,
  destinyRoute,
  ...props
}: AuthenticationRequiredMessageProps) => {
  const cn = classNames("authentication-required-message", className);
  return (
    <div className={cn} {...props}>
      <p>Página restrita para usuários com acesso.</p>
      <p>Realize login para continuar:</p>
      <Button href={getURLLogin(destinyRoute)}>Ir para página de login</Button>
    </div>
  );
};

export default AuthenticationRequiredMessage;
