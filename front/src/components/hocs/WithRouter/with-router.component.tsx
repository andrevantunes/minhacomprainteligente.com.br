import type { WithRouterProps } from "./with-router.types";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const WithRouter = ({ children, include = [], exclude = [] }: WithRouterProps) => {
  const router = useRouter();
  const path = router.basePath + router.asPath;
  const [show, setShow] = useState(false);

  const matchString = (str: string) => {
    const regexStr = "^" + str.replaceAll("/", "\\/");
    const ending = str[str.length - 1] === "*" ? "" : "$";
    const regex = new RegExp(regexStr + ending);
    return regex.test(path);
  };

  const matchArray = (array: string[]) => !!array?.some((route: string) => matchString(route));

  const included = () => {
    if (typeof include === "string") return matchString(include);
    return matchArray(include);
  };

  const excluded = () => {
    if (typeof exclude === "string") return matchString(exclude);
    return matchArray(exclude);
  };

  useEffect(() => {
    if (included() && !excluded()) {
      setShow(true);
    }
  }, []);

  return show ? <>{children}</> : <></>;
};

export default WithRouter;
