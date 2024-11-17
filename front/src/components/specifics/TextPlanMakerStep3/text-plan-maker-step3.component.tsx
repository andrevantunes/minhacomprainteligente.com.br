import classNames from "classnames";
import { AreaField } from "@andrevantunes/andrevds";
import { ButtonBack, ButtonNext } from "../TextPlanMaker/text-plan-maker.component";
import { TextPlanMakerStepProps } from "../TextPlanMaker/text-plan-maker.types";
import { minLength } from "../TextPlanMaker/text-plan-maker.helpers";

const TextPlanMakerStep3 = ({
  setCurrentStep,
  thesis,
  setThesis,
  className,
  label,
  placeholder,
}: TextPlanMakerStepProps) => {
  const cn = classNames("text-plan-maker-step3", className);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setThesis?.(event.target.value);
  const handleClickBack = () => setCurrentStep?.(1);
  const handleClickNext = () => setCurrentStep?.(3);
  const disabled = (thesis?.length ?? 0) < minLength;

  return (
    <div className={cn}>
      <AreaField
        rows={8}
        onChange={handleChange}
        value={thesis}
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

export default TextPlanMakerStep3;
