import type { HostHeaderProps } from "./host-header.types";
import classNames from "classnames";
import { Card, Image } from "@andrevantunes/andrevds";
import {Button} from "@/components";
import React from "react";

const HostHeader = ({ children, className, backButton = true, src, text, ...props }: HostHeaderProps) => {
  const cn = classNames("host-header", className);
  const handleOnClick = (_event: any) => {
    history.back();
  };
  return (
    <Card
      className={cn}
      elevation="md"
      {...props}
      style={{
        width: "100%",
        display: "flex",
        padding: 24,
        alignItems: "center",
        borderRadius: 8,
        flexDirection: "column",
      }}
    >
      {backButton && (
        <Button
          variant="naked"
          iconName="chevron-left"
          className="host-header__btn-back"
          onClick={handleOnClick}
        >
          Voltar
        </Button>
      )}
      <Image src={src} style={{ marginBottom: 16 }} />
      {children}
    </Card>
  );
};

export default HostHeader;
