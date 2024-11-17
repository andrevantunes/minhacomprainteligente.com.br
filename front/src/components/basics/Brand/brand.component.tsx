import type { BrandProps } from "./brand.types";

import { PlatformContext } from "@/contexts/PlatformContext";
import { StoreType, useStore } from "@/store";
import { Image } from "@andrevantunes/andrevds";
import classNames from "classnames";
import { useContext } from "react";
import { specialLogo } from "@/components/specifics/SidebarManager/sidebar-manager.helpers";

const Brand = ({ className, height = 32, ...props }: BrandProps) => {
  const cn = classNames("brand", className);
  const platform = useContext(PlatformContext);
  const [accesses] = useStore(StoreType.Accesses);

  const image = specialLogo({ ...platform?.brand?.logos }, accesses?.type);

  return (
    <Image
      data-testid="image"
      title="Logo"
      alt="Logo"
      {...image}
      height={image?.height ?? height}
      {...props}
      className={cn}
    />
  );
};

export default Brand;
