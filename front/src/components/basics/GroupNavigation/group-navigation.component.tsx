import type { GroupNavigationProps } from "./group-navigation.types";

import { useRouter } from "next/router";
import { Subtitle, SubtitleSizes } from "@andrevantunes/andrevds";
import classNames from "classnames";

import { NavigationItem, ToggleButton } from "@/components";

const GroupNavigation = ({
  targetId,
  title,
  list,
  children,
  className,
  previous,
  next,
  ...props
}: GroupNavigationProps) => {
  const router = useRouter();

  const cn = classNames("group-navigation negative-margin", className);

  const handleRedirect = (pathname: string, query?: any) => {
    router.push({ pathname, query }, undefined, { scroll: false });
  };

  const setNavigation = (isForward = false, href?: string) => {
    if (href) return;

    const increment = isForward ? 1 : -1;
    const currentPage = Number(router?.query?.page) || 0;
    const page = currentPage + increment;
    const { pathname, query = {} } = router;
    if (page !== 0) return handleRedirect(pathname, { ...query, page });
    delete query?.page;
    handleRedirect(pathname, query);
  };

  return (
    <div className={cn} {...props}>
      <div className="group-navigation__container">
        <div className="group-navigation__container__wrapper">
          <ToggleButton
            iconName="chevron-left"
            className="group-navigation__button"
            onClick={() => setNavigation(false, previous?.href)}
            {...previous}
          />

          {list?.map((item, index) => (
            <NavigationItem key={index} {...item} />
          ))}

          <ToggleButton
            iconName="chevron-right"
            className="group-navigation__button"
            onClick={() => setNavigation(true, next?.href)}
            {...next}
          />
        </div>
      </div>

      <Subtitle level={3} size={SubtitleSizes.Small} className="my-lg text-center">
        {title}
      </Subtitle>

      {children}
    </div>
  );
};

export default GroupNavigation;
