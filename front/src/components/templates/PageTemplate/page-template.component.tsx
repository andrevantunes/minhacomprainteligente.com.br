import type { PageTemplateProps } from "./page-template.types";
import { Header, SidebarManager } from "@/components";
import { mockSidebarList } from "@/components/specifics/SidebarManager/sidebar-manager.fixture";

import classNames from "classnames";

const PageTemplate = ({ children, className, hideSidebar, full, ...props }: PageTemplateProps) => {
  const cn = classNames("page-template", className, {
    "page-template--is-sidebar-hidden": hideSidebar,
  });
  return (
    <>
      <Header />
      <div className={cn} {...props}>
        {!hideSidebar && <SidebarManager sidebarItems={mockSidebarList} />}
        <div
          className={classNames("app-template__content", {
            "app-template__full": full,
            "app-template__protected-area": !full,
          })}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default PageTemplate;
