import type { RedirectProps } from "./redirect.types";

import { useEffect } from "react";
import Router from "next/router";
import { removeBasePath, isExternalLink } from "@/helpers/links.helpers";

const Redirect = ({ to }: RedirectProps) => {
  const redirect = () => {
    if (!to) return;
    if (isExternalLink(to)) return location.replace(to);
    Router.push(removeBasePath(to));
  };

  useEffect(() => {
    redirect();
  }, [to]);

  return <div className="redirect" />;
};

export default Redirect;
