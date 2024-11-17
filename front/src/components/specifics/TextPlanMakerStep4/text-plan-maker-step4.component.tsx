import classNames from "classnames";
import { AreaField } from "@andrevantunes/andrevds";
import { ButtonBack, ButtonNext } from "../TextPlanMaker/text-plan-maker.component";
import { TextPlanMakerStepProps } from "../TextPlanMaker/text-plan-maker.types";
import { minLength } from "../TextPlanMaker/text-plan-maker.helpers";

const TextPlanMakerStep4 = ({
  firstArgument,
  setFirstArgument,
  setCurrentStep,
  className,
  label,
  placeholder,
}: TextPlanMakerStepProps) => {
  const cn = classNames("text-plan-maker-step4", className);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setFirstArgument?.(event.target.value);
  const handleClickBack = () => setCurrentStep?.(2);
  const handleClickNext = () => setCurrentStep?.(4);
  const disabled = (firstArgument?.length ?? 0) < minLength;

  return (
    <div className={cn}>
      <AreaField
        rows={8}
        onChange={handleChange}
        value={firstArgument}
        label={label}
        placeholder={placeholder}
      />
      <div className="text-plan-maker__actions-wrapper">
        <ButtonBack onClick={handleClickBack}>Voltar</ButtonBack>
        <ButtonNext onClick={handleClickNext} disabled={disabled}>
          Próximo
        </ButtonNext>
      </div>
    </div>
  );
};

export default TextPlanMakerStep4;
