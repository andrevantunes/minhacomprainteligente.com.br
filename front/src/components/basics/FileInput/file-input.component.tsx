import type { FileInputProps } from "./file-input.types";

import classNames from "classnames";

const FileInput = ({ children, className, image, ...props }: FileInputProps) => {
  const cn = classNames("file-input", className);
  return (
    <div className={cn} {...props}>
      {image && <img src={image} layout="fill" />}
      <input type="file" />
    </div>
  );
};

export default FileInput;
