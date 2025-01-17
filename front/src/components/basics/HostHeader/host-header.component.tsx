import type { HostHeaderProps } from "./host-header.types";
import classNames from "classnames";
import { Card, Text, Image } from "@andrevantunes/andrevds";

const HostHeader = ({ children, className, src, text, ...props }: HostHeaderProps) => {
  const cn = classNames("host-header", className);
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
      <Image src={src} style={{marginBottom: 16}} />
      {children}
    </Card>
  );
};

export default HostHeader;
