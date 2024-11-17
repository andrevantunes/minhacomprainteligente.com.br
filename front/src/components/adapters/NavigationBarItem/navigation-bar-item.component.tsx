import React from "react";
import { Button } from "@/components";
import {
  NavigationBarItem as NavigationBarItemMars,
  NavigationBarItemProps,
} from "@andrevantunes/andrevds";

const NavigationBarItem = (props: NavigationBarItemProps) => {
  const componentLink = props.href ? Button : undefined;

  return <NavigationBarItemMars {...props} componentLink={componentLink} />;
};

export default NavigationBarItem;
