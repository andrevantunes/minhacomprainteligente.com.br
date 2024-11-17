import classNames from "classnames";
import { AreaField } from "@andrevantunes/andrevds";
import { ButtonBack, ButtonNext } from "../TextPlanMaker/text-plan-maker.component";
import { TextPlanMakerStepProps } from "../TextPlanMaker/text-plan-maker.types";
import { minLength } from "../TextPlanMaker/text-plan-maker.helpers";

const TextPlanMakerStep2 = ({
  className,
  setCurrentStep,
  ideas,
  setIdeas,
  label,
  placeholder,
}: TextPlanMakerStepProps) => {
  const cn = classNames("text-plan-maker-step2", className);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setIdeas?.(event.target.value);
  const handleClickBack = () => setCurrentStep?.(0);
  const handleClickNext = () => setCurrentStep?.(2);
  const disabled = (ideas?.length ?? 0) < minLength;

  return (
    <div className={cn}>
      <AreaField
        rows={8}
        onChange={handleChange}
        value={ideas}
        className={"text-plan-maker__area-field"}
        label={label}
        placeholder={placeholder}
        data-testid="area-field-ideas"
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

export default TextPlanMakerStep2;
