interface NavigationItemProps {
  title: string;
  subtitle: string;
  active?: boolean;
  // remove isCurrent after the next release
  isCurrent?: boolean;
  disabled?: boolean;
  href?: string;
  checked?: boolean;
}

export type { NavigationItemProps };
