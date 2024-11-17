import { sanitize } from "@/helpers/sanitize.helpers";
import classNames from "classnames";
import { DangerousHTMLProps } from "./dangerous-html.types";

const DangerousHTML = ({ as, html, children, className, ...props }: DangerousHTMLProps) => {
  const cn = classNames(className, "dangerous-html");
  const Component = as || "div";
  const text = html || children;
  if (typeof text !== "string") return null;
  const __html = sanitize(text);
  return <Component className={cn} dangerouslySetInnerHTML={{ __html }} {...props} />;
};

export default DangerousHTML;
