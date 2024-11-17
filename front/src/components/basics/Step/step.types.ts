import type { ButtonProps } from "@/components/adapters/Button";

interface StepProps {
  title: string;
  text: string;
  buttons: Array<ButtonProps & { action?: string; successText: string; errorText: string }>;
  close: VoidFunction;
  className?: string;
}

export type { StepProps };
