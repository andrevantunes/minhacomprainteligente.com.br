import type { HeaderSectionProps } from "./header-section.types";

import { HeadingSizes } from "@andrevantunes/andrevds";
import { Text, Title } from "@/components";
import classNames from "classnames";
import React from "react";

const HeaderSection = ({ className, title, text }: HeaderSectionProps) => {
  const cn = classNames("header-section", className);
  return (
    <div className={cn}>
      {title && (
        <Title className="mb-lg" level={2} size={HeadingSizes.Small}>
          {title}
        </Title>
      )}

      {text && <Text className="mb-lg">{text}</Text>}
    </div>
  );
};

export default HeaderSection;
