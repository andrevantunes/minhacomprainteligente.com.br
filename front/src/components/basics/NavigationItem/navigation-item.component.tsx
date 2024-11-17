import type { NavigationItemProps } from "./navigation-item.types";

import { ButtonVariants, HeadingSizes, SubtitleSizes } from "@andrevantunes/andrevds";
import classNames from "classnames";

import { Button } from "@/components/adapters/Button";
import { Title } from "@/components/adapters/Title";

const NavigationItem = ({
  title,
  subtitle,
  href,
  disabled,
  active,
  isCurrent,
  checked,
}: NavigationItemProps) => {
  const cn = classNames("navigation-item", {
    "navigation-item--is-active": isCurrent || active,
    "navigation-item--is-disabled": disabled,
    "navigation-item--is-checked": checked,
  });

  const handleClick = (event: React.MouseEvent) => {
    if (!href?.startsWith("#")) return;

    event.preventDefault();

    const id = href.substring(1);
    const element = window?.document.getElementById(id);
    const isOpen = element?.classList.contains("accordion--is-open");
    const button = element?.getElementsByTagName("button")[0];

    if (!button) return;
    if (!isOpen) button.click();
    setTimeout(() => element?.scrollIntoView(), 100);
  };

  return (
    <Button
      className={cn}
      variant={ButtonVariants.Neutral}
      href={href}
      onClick={handleClick}
      disabled={disabled}
    >
      <Title as="span" size={HeadingSizes.Medium}>
        {title}
      </Title>

      <Title as="span" variant="subtitle" size={SubtitleSizes.Small}>
        {subtitle}
      </Title>
    </Button>
  );
};

export default NavigationItem;
