import type { HTMLProps, PropsWithChildren } from "react";

interface TextPlanMakerProps extends PropsWithChildren<HTMLProps<HTMLDivElement>> {
  steps: any;
  itemToken?: string;
}

interface TextPlanMakerStepProps {
  videoId?: string;
  setCurrentStep?: React.Dispatch<React.SetStateAction<number>>;
  ideas?: string;
  setIdeas?: React.Dispatch<React.SetStateAction<string>>;
  thesis?: string;
  setThesis?: React.Dispatch<React.SetStateAction<string>>;
  firstArgument?: string;
  setFirstArgument?: React.Dispatch<React.SetStateAction<string>>;
  secondArgument?: string;
  setSecondArgument?: React.Dispatch<React.SetStateAction<string>>;
  agent?: string;
  setAgent?: React.Dispatch<React.SetStateAction<string>>;
  action?: string;
  setAction?: React.Dispatch<React.SetStateAction<string>>;
  means?: string;
  setMeans?: React.Dispatch<React.SetStateAction<string>>;
  aim?: string;
  setAim?: React.Dispatch<React.SetStateAction<string>>;
  className?: string;
  handleSubmit: () => void;
  loading?: boolean;
  setLoading?: React.Dispatch<React.SetStateAction<boolean>>;
  label?: string;
  placeholder?: string;
  updating?: boolean;
  topic?: string;
  titles?: string[];
  itemToken: TextPlanMakerProps["itemToken"];
  showModal?: boolean;
  setShowModal?: React.Dispatch<React.SetStateAction<boolean>>;
  mediumToken?: string;
}

interface CreateUpdateProps {
  draft: {
    ideas: string;
    thesis: string;
    firstArgument: string;
    secondArgument: string;
    agent: string;
    action: string;
    means: string;
    aim: string;
  };
}

export type { TextPlanMakerProps, TextPlanMakerStepProps, CreateUpdateProps };
