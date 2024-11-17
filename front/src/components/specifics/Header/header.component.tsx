import type { HeaderProps } from "./header.types";

import classNames from "classnames";
import { ToggleButton } from "@andrevantunes/andrevds";

import { SidebarManager } from "@/components";
import React, { useEffect, useRef, useState } from "react";
import { Brand } from "@/components/basics/Brand";

const HEADER_HEIGHT = 64;

const Header = ({ children, ...props }: HeaderProps) => {
  const handleMenuClick = () => {
    SidebarManager.open();
  };

  const prevScrollY = useRef(0);
  const [goingUp, setGoingUp] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isAbovePosition = currentScrollY < HEADER_HEIGHT;
      if (!isAbovePosition && prevScrollY.current < currentScrollY && goingUp) {
        setGoingUp(false);
      }
      if ((isAbovePosition || prevScrollY.current > currentScrollY) && !goingUp) {
        setGoingUp(true);
      }
      prevScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [goingUp]);

  const cn = classNames("header", {
    "header--is-going-up": goingUp,
  });

  return (
    <div {...props} className={cn} data-testid="header">
      <div className="header__container">
        <ToggleButton
          variant="text"
          iconName="menu"
          className="header__menu-btn"
          data-testid="open-sidebar-button"
          onClick={handleMenuClick}
        />
        <Brand />
      </div>
    </div>
  );
};

export default Header;
