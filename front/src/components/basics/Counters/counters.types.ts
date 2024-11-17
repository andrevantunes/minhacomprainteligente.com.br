import { ComponentType } from "@/types";

interface CountersList {
  text: string;
  iconName: string;
}

interface CountersProps extends ComponentType {
  list: CountersList[];
}

export type { CountersProps };
