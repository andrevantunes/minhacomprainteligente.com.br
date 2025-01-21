import type { LoginFormProps } from "./login-form.types";

import classNames from "classnames";
import { PasswordField, TextField, Card, Image } from "@andrevantunes/andrevds";
import { Button, Title } from "@/components";
import { postBffApi } from "@/requests";
import { notifySuccess } from "@/helpers/notify.helper";
import Router from "next/router";

const LoginForm = ({ children, className, ...props }: LoginFormProps) => {
  const cn = classNames("login-form flex flex-column align-items-stretch gap-1x", className);
  const handleSubmit = (event: any) => {
    event.preventDefault();
    postBffApi("auth/email/login", {
      email: event.target.querySelector("#email").value,
      password: event.target.querySelector("#password").value,
    }).then((response: any) => {
      localStorage.setItem("authorization", response.token);
      notifySuccess("Login realizado com sucesso!");
      Router.push("/dashboard");
    });
  };
  return (
    <Card className={cn} {...props}>
      <div className="flex justify-content-center">
        <Image src="https://d21gq13m1q7xhx.cloudfront.net/public/logo/logo-minha-compra-inteligente-100x100.png" />
      </div>
      <Title>Login</Title>
      <form onSubmit={handleSubmit} className="flex flex-column gap-1x">
        <div className="text-left">
          <TextField label="Email" name="email" />
        </div>
        <div className="text-left">
          <PasswordField label="Senha" name="password" />
        </div>
        <div>
          <Button type="submit">Entrar</Button>
        </div>
      </form>
    </Card>
  );
};

export default LoginForm;
