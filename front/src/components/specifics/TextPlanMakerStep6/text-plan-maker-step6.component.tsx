import classNames from "classnames";
import { AreaField } from "@andrevantunes/andrevds";
import { ButtonBack, ButtonNext } from "../TextPlanMaker/text-plan-maker.component";
import { TextPlanMakerStepProps } from "../TextPlanMaker/text-plan-maker.types";
import { minLength } from "../TextPlanMaker/text-plan-maker.helpers";

const TextPlanMakerStep6 = ({
  agent,
  setAgent,
  action,
  setAction,
  means,
  setMeans,
  aim,
  setAim,
  setCurrentStep,
  className,
}: TextPlanMakerStepProps) => {
  const cn = classNames("text-plan-maker-step4", className);
  const handleChangeAgent = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setAgent?.(event.target.value);
  const handleChangeAction = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setAction?.(event.target.value);
  const handleChangeMeans = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setMeans?.(event.target.value);
  const handleChangeAim = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setAim?.(event.target.value);
  const handleClickBack = () => setCurrentStep?.(4);
  const handleClickNext = () => setCurrentStep?.(6);
  const disabled =
    (agent?.length ?? 0) < minLength ||
    (action?.length ?? 0) < minLength ||
    (means?.length ?? 0) < minLength ||
    (aim?.length ?? 0) < minLength;

  return (
    <div className={cn}>
      <AreaField
        label="Agente"
        rows={8}
        onChange={handleChangeAgent}
        value={agent}
        className="mt-xl mb-xl"
      />
      <AreaField
        label="Ação"
        rows={8}
        onChange={handleChangeAction}
        value={action}
        className="mb-xl"
      />
      <AreaField
        label="Meio"
        rows={8}
        onChange={handleChangeMeans}
        value={means}
        className="mb-xl"
      />
      <AreaField
        label="Finalidade"
        rows={8}
        onChange={handleChangeAim}
        value={aim}
        className="mb-xl"
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

export default TextPlanMakerStep6;
