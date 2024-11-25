import type { HostHeaderProps } from "./host-header.types";
import classNames from "classnames";
import { Card, Text, Image } from "@andrevantunes/andrevds";

const HostHeader = ({ children, className, src, text, ...props }: HostHeaderProps) => {
  const cn = classNames("host-header", className);
  return (
    <Card
      className={cn}
      {...props}
      style={{
        color: "white",
        width: "100%",
        display: "flex",
        padding: 24,
        alignItems: "center",
        borderRadius: 8,
        flexDirection: "column",
        backgroundColor: "#1f7445",
      }}
    >
      <Image src={src} />
      <Text>{text}</Text>
    </Card>
  );
};

export default HostHeader;
