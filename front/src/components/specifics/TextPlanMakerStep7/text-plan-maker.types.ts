import { TextPlanMakerStepProps } from "../TextPlanMaker/text-plan-maker.types";

interface ViewTemplateProps
  extends Pick<
    TextPlanMakerStepProps,
    | "ideas"
    | "thesis"
    | "firstArgument"
    | "secondArgument"
    | "agent"
    | "action"
    | "means"
    | "aim"
    | "titles"
  > {}

interface EditTemplateProps
  extends Pick<
    TextPlanMakerStepProps,
    | "ideas"
    | "setIdeas"
    | "thesis"
    | "setThesis"
    | "firstArgument"
    | "setFirstArgument"
    | "secondArgument"
    | "setSecondArgument"
    | "agent"
    | "setAgent"
    | "action"
    | "setAction"
    | "means"
    | "setMeans"
    | "aim"
    | "setAim"
    | "titles"
  > {}

export type { ViewTemplateProps, EditTemplateProps };
