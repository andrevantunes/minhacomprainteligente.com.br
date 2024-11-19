import type { CustomerTemplateProps } from "./customer-template.types";
import { CartCloser, Header, SidebarManager } from "@/components";
import { mockSidebarList } from "@/components/specifics/SidebarManager/sidebar-manager.fixture";

import classNames from "classnames";

const CustomerTemplate = ({
  children,
  className,
  hideSidebar,
  full,
  ...props
}: CustomerTemplateProps) => {
  const cn = classNames("page-template", className, {
    "page-template--is-sidebar-hidden": hideSidebar,
  });
  return (
    <>
      {!hideSidebar && <Header />}
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
      <CartCloser />
    </>
  );
};

export default CustomerTemplate;
