import type { ModalContentProps } from "./modal-content.types";

import { Heading, Image } from "@andrevantunes/andrevds";
import classNames from "classnames";

const ModalContent = ({ lettering, title, children, className, ...props }: ModalContentProps) => {
  const cn = classNames("modal-content", className);
  return (
    <div className={cn} {...props}>
      {lettering && <Image className="mb-sm" {...lettering} />}
      {title && (
        <Heading level={2} className="mb-sm">
          {title}
        </Heading>
      )}
      {children}
    </div>
  );
};

export default ModalContent;
