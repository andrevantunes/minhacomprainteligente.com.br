export const isChildrenAsTypeProps = (children: any) => {
  if (!children) return false;
  if (typeof children === "string") return false;
  return Boolean(children.children || children.html);
};
