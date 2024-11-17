import classNames from "classnames";
import { ButtonNext } from "../TextPlanMaker/text-plan-maker.component";
import { TextPlanMakerStepProps } from "../TextPlanMaker/text-plan-maker.types";

const TextPlanMakerStep1 = ({ videoId, className, setCurrentStep }: TextPlanMakerStepProps) => {
  const cn = classNames("text-plan-maker-step1", className);
  const handleClickNext = () => setCurrentStep?.(1);
  if (!videoId) return <></>;

  return (
    <div className={cn}>
      {/*<Video videoId={videoId} className="text-plan-maker-step1__video" />*/}
      <div className="text-plan-maker__actions-wrapper">
        <ButtonNext onClick={handleClickNext}>Começar</ButtonNext>
      </div>
    </div>
  );
};

export default TextPlanMakerStep1;
