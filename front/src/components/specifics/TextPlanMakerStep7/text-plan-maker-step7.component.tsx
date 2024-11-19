import classNames from "classnames";
import { AreaField, Button, Hr, Heading, Image, Modal, Text } from "@andrevantunes/andrevds";
import { ButtonBack, ButtonNext } from "../TextPlanMaker/text-plan-maker.component";
import { TextPlanMakerStepProps } from "../TextPlanMaker/text-plan-maker.types";
import { ReactNode, useState } from "react";
import { minLength, printTextPlan } from "../TextPlanMaker/text-plan-maker.helpers";
import { EditTemplateProps, ViewTemplateProps } from "./text-plan-maker.types";

const TextPlanMakerStep7 = ({
  ideas,
  setIdeas,
  thesis,
  setThesis,
  firstArgument,
  setFirstArgument,
  secondArgument,
  setSecondArgument,
  agent,
  setAgent,
  action,
  setAction,
  means,
  setMeans,
  aim,
  setAim,
  setCurrentStep,
  handleSubmit,
  className,
  loading,
  updating,
  topic,
  titles,
  showModal,
  setShowModal,
  mediumToken,
}: TextPlanMakerStepProps) => {
  const cn = classNames("text-plan-maker-step7", className);
  const [editing, setEditing] = useState(false);
  const handleClickBack = () => setCurrentStep?.(5);
  const handleClickEdit = () => setEditing((value) => !value);

  const disabled =
    (ideas?.length ?? 0) < minLength ||
    (thesis?.length ?? 0) < minLength ||
    (firstArgument?.length ?? 0) < minLength ||
    (secondArgument?.length ?? 0) < minLength ||
    (agent?.length ?? 0) < minLength ||
    (action?.length ?? 0) < minLength ||
    (means?.length ?? 0) < minLength ||
    (aim?.length ?? 0) < minLength;

  return (
    <div className={cn}>
      <div className="text-plan-maker-step7__title-wrapper">
        <Heading>Seu plano de texto</Heading>
        <div>
          <Button
            iconName="download"
            variant="naked"
            style={{
              borderRadius: "50%",
              width: "32px",
              height: "32px",
            }}
            disabled={loading || editing}
            onClick={() =>
              printTextPlan({
                topic,
                ideas,
                thesis,
                firstArgument,
                secondArgument,
                agent,
                action,
                means,
                aim,
              })
            }
          />
          <Button
            data-testid="button-edit"
            onClick={handleClickEdit}
            iconName="edit"
            variant="naked"
            style={{
              borderRadius: "50%",
              width: "32px",
              height: "32px",
            }}
            disabled={loading}
          />
        </div>
      </div>
      {topic && <Block title="Tema">{topic}</Block>}
      {!editing && (
        <ViewTemplate
          ideas={ideas}
          thesis={thesis}
          firstArgument={firstArgument}
          secondArgument={secondArgument}
          agent={agent}
          action={action}
          means={means}
          aim={aim}
          titles={titles}
        />
      )}
      {editing && (
        <EditTemplate
          ideas={ideas}
          setIdeas={setIdeas}
          thesis={thesis}
          setThesis={setThesis}
          firstArgument={firstArgument}
          setFirstArgument={setFirstArgument}
          secondArgument={secondArgument}
          setSecondArgument={setSecondArgument}
          agent={agent}
          setAgent={setAgent}
          action={action}
          setAction={setAction}
          means={means}
          setMeans={setMeans}
          aim={aim}
          setAim={setAim}
          titles={titles}
        />
      )}

      <div className="text-plan-maker__actions-wrapper">
        <ButtonBack onClick={handleClickBack} disabled={loading}>
          Voltar
        </ButtonBack>
        <ButtonNext onClick={handleSubmit} disabled={loading || disabled}>
          {updating ? "Atualizar" : "Salvar"}
        </ButtonNext>
      </div>
      {showModal && <ModalFinish mediumToken={mediumToken} setShowModal={setShowModal} />}
    </div>
  );
};

const Title = ({ children }: { children: ReactNode | string }) => (
  <Text
    size="sm"
    className="mb-lg"
    style={{ color: "var(--color-text-secondary)", fontWeight: 500 }}
  >
    {children}
  </Text>
);

const Block = ({ title, children }: { title: string; children: ReactNode | string }) => (
  <>
    <Title>{title}</Title>
    <Text as="div">{children}</Text>
    <Hr className="mt-lg mb-lg" />
  </>
);

const ViewTemplate = ({
  ideas,
  thesis,
  firstArgument,
  secondArgument,
  agent,
  action,
  means,
  aim,
  titles,
}: ViewTemplateProps) => {
  return (
    <>
      <Block title={titles?.[1] ?? ""}>{ideas}</Block>
      <Block title={titles?.[2] ?? ""}>{thesis}</Block>
      <Block title={titles?.[3] ?? ""}>{firstArgument}</Block>
      <Block title={titles?.[4] ?? ""}>{secondArgument}</Block>
      <Block title={titles?.[5] ?? ""}>
        <Title>Agente</Title>
        <p>{agent}</p>
        <Title>Ação</Title>
        <p>{action}</p>
        <Title>Meio</Title>
        <p>{means}</p>
        <Title>Finalidade</Title>
        <p>{aim}</p>
      </Block>
    </>
  );
};

const EditTemplate = ({
  ideas,
  setIdeas,
  thesis,
  setThesis,
  firstArgument,
  setFirstArgument,
  secondArgument,
  setSecondArgument,
  agent,
  setAgent,
  action,
  setAction,
  means,
  setMeans,
  aim,
  setAim,
  titles,
}: EditTemplateProps) => {
  const handleChangeIdeas = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setIdeas?.(event.target.value);
  const handleChangeThesis = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setThesis?.(event.target.value);
  const handleChangeFirstArgument = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setFirstArgument?.(event.target.value);
  const handleChangeSecondArgument = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setSecondArgument?.(event.target.value);
  const handleChangeAgent = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setAgent?.(event.target.value);
  const handleChangeAction = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setAction?.(event.target.value);
  const handleChangeMeans = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setMeans?.(event.target.value);
  const handleChangeAim = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    setAim?.(event.target.value);

  return (
    <>
      <Title>{titles?.[1]}</Title>
      <AreaField
        onChange={handleChangeIdeas}
        value={ideas}
        className={"text-plan-maker__area-field"}
      />
      <Hr className="mt-lg mb-lg" />
      <Title>{titles?.[2]}</Title>
      <AreaField
        onChange={handleChangeThesis}
        value={thesis}
        className={"text-plan-maker__area-field"}
      />
      <Hr className="mt-lg mb-lg" />
      <Title>{titles?.[3]}</Title>
      <AreaField
        onChange={handleChangeFirstArgument}
        value={firstArgument}
        className={"text-plan-maker__area-field"}
      />
      <Hr className="mt-lg mb-lg" />
      <Title>{titles?.[4]}</Title>
      <AreaField
        onChange={handleChangeSecondArgument}
        value={secondArgument}
        className={"text-plan-maker__area-field"}
      />
      <Hr className="mt-lg mb-lg" />
      <Title>{titles?.[5]}</Title>
      <Title>Agente</Title>
      <AreaField
        onChange={handleChangeAgent}
        value={agent}
        className={"text-plan-maker__area-field mb-lg"}
      />
      <Title>Ação</Title>
      <AreaField
        onChange={handleChangeAction}
        value={action}
        className={"text-plan-maker__area-field mb-lg"}
      />
      <Title>Meio</Title>
      <AreaField
        onChange={handleChangeMeans}
        value={means}
        className={"text-plan-maker__area-field mb-lg"}
      />
      <Title>Finalidade</Title>
      <AreaField onChange={handleChangeAim} value={aim} className={"text-plan-maker__area-field"} />
    </>
  );
};

export const ModalFinish = ({
  mediumToken,
  setShowModal,
}: {
  mediumToken: TextPlanMakerStepProps["mediumToken"];
  setShowModal: TextPlanMakerStepProps["setShowModal"];
}) => {
  return (
    <Modal size="sm" onClose={() => setShowModal?.(false)} close={() => true}>
      <div className="flex justify-content-center">
        <Image
          src="https://cdn.mesalva.com/uploads/image/MjAyMy0wMy0wOCAxNDoyOTo0NSArMDAwMDc3MjEwOQ%3D%3D%0A.png"
          alt="plano de texto"
        />
      </div>
      <Heading size="sm" className="text-center mb-sm">
        Plano de texto salvo!
      </Heading>
      <Text className="mb-xl">
        Você pode acompanhar seus planos de texto salvos na página minhas redações.
      </Text>
      <Button className="w-100 mb-sm" href={`/app/redacao/enviar?token=${mediumToken}`}>
        Enviar redação
      </Button>
      <Button variant="naked" className="w-100" href="/app/redacao/minhas-redacoes">
        Minhas redações
      </Button>
    </Modal>
  );
};

export default TextPlanMakerStep7;
