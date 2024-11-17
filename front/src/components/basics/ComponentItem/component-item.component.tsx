import type { ComponentItemProps } from "./component-item.types";

import { Avatar, Caption, Icon, ToggleDropdown } from "@andrevantunes/andrevds";
import classNames from "classnames";

import { LabelList, Link, Title } from "@/components";
import React, { useState } from "react";

const ComponentItem = ({
  title,
  overline,
  overlineStyle,
  caption,
  avatar,
  icon,
  link,
  labels,
  isLast,
  actions = [],
  className,
  children,
  checked,
  checkRight = false,
  ...props
}: ComponentItemProps) => {
  const [actionsIsOpen, setActionsIsOPen] = useState(false);
  const cn = classNames("component-item__link", className, {
    "component-item__link--is-actions-open": actionsIsOpen,
    "component-item__link--is-last": isLast,
    "component-item__link--is-cursor-disabled": !link,
  });

  return (
    <li className="component-item" {...props}>
      {children}
      <Link href="#" {...link} className={cn}>
        {avatar && <Avatar size="lg" {...avatar} className="component-item__image" />}
        {icon && <Icon {...icon} className="component-item__icon" />}

        <div className="component-item__content">
          {overline && (
            <Title as="span" variant="subtitle" size="sm" style={overlineStyle}>
              {overline}
            </Title>
          )}
          <Title variant="item" as="h3" className="component-item__title">
            {title}
          </Title>
          {caption && <Caption>{caption}</Caption>}

          {Array.isArray(labels) && labels.length > 0 && (
            <LabelList className="mt-xs" list={labels} />
          )}
        </div>
        {actions.length > 0 && (
          <div
            className="component-item__actions"
            onClick={(e: React.MouseEvent) => {
              e.preventDefault();
              e.stopPropagation();
            }}
          >
            <ToggleDropdown
              componentLink={Link}
              onToggle={setActionsIsOPen}
              isRight
              isAbove={isLast}
              list={actions}
            />
          </div>
        )}
      </Link>
    </li>
  );
};

export default ComponentItem;
