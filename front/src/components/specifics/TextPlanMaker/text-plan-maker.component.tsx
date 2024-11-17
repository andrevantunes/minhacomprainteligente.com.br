import type { CreateUpdateProps, TextPlanMakerProps } from "./text-plan-maker.types";

import classNames from "classnames";
import { useEffect, useState } from "react";
import { TextPlanMakerStep1 } from "../TextPlanMakerStep1";
import {
  Button,
  ButtonProps,
  CircleStepper,
  Divider,
  Heading,
  Stepper,
  Text,
} from "@andrevantunes/andrevds";
import { Card } from "@andrevantunes/andrevds";
import { TextPlanMakerStep2 } from "../TextPlanMakerStep2";
import { TextPlanMakerStep3 } from "../TextPlanMakerStep3";
import { TextPlanMakerStep4 } from "../TextPlanMakerStep4";
import { TextPlanMakerStep5 } from "../TextPlanMakerStep5";
import { TextPlanMakerStep6 } from "../TextPlanMakerStep6";
import { TextPlanMakerStep7 } from "../TextPlanMakerStep7";
import { getBffApi, putBffApi } from "@/requests";
import { notifyError, notifySuccess } from "@/helpers/notify.helper";
import { getError } from "@/helpers/errors.helper";
import { useRouter } from "next/router";

const textPlanMakerSteps = [
  TextPlanMakerStep1,
  TextPlanMakerStep2,
  TextPlanMakerStep3,
  TextPlanMakerStep4,
  TextPlanMakerStep5,
  TextPlanMakerStep6,
  TextPlanMakerStep7,
];

const TextPlanMaker = ({
  children,
  steps,
  className,
  itemToken = "",
  ...props
}: TextPlanMakerProps) => {
  const cn = classNames("text-plan-maker", className);
  const [currentStep, setCurrentStep] = useState(0);
  const [ideas, setIdeas] = useState("");
  const [thesis, setThesis] = useState("");
  const [firstArgument, setFirstArgument] = useState("");
  const [secondArgument, setSecondArgument] = useState("");
  const [agent, setAgent] = useState("");
  const [action, setAction] = useState("");
  const [means, setMeans] = useState("");
  const [aim, setAim] = useState("");
  const [loading, setLoading] = useState(false);
  const [updating, setUpdating] = useState(false);
  const [topic, setTopic] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [mediumToken, setMediumToken] = useState("");

  const stepsForStepper = steps.map((value: any) => value.stepperTitle);
  const titles = steps.map((value: any) => value.title);
  const router = useRouter();

  useEffect(() => {
    let isCancelled = false;
    if (!router?.isReady || !itemToken) return;
    getBffApi(`user/essays/text_plans/${itemToken}`).then((data: any) => {
      if (isCancelled) return;
      const {
        ideas = "",
        thesis = "",
        firstArgument = "",
        secondArgument = "",
        agent = "",
        action = "",
        means = "",
        aim = "",
      } = data?.draft ?? {};

      if (data?.started === true) {
        setUpdating(true);
        setCurrentStep(6);
      }

      setTopic(data?.itemName);
      setIdeas(ideas);
      setThesis(thesis);
      setFirstArgument(firstArgument);
      setSecondArgument(secondArgument);
      setAgent(agent);
      setAction(action);
      setMeans(means);
      setAim(aim);
      setMediumToken(data?.mediumToken ?? "");
    });

    return () => {
      isCancelled = true;
    };
  }, []);

  const onSuccess = () => {
    setShowModal(true);
    setUpdating(true);
    notifySuccess("Plano de texto atualizado com sucesso!");
  };

  const onError = (data: any) => notifyError(getError(data));
  const onFinally = () => setLoading(false);

  const handleSubmit = () => {
    setLoading(true);
    const data: CreateUpdateProps = {
      draft: {
        ideas,
        thesis,
        firstArgument,
        secondArgument,
        agent,
        action,
        means,
        aim,
      },
    };

    putBffApi(`user/essays/text_plans/${itemToken}`, data)
      .then(onSuccess)
      .catch(onError)
      .finally(onFinally);
  };

  return (
    <div className={cn} {...props}>
      {textPlanMakerSteps.map((value, index) => {
        const Component = value;
        const isCurrent = index === currentStep;

        return (
          <div key={`text-plan-maker-step-${index}`}>
            {isCurrent && (
              <>
                <Stepper
                  steps={stepsForStepper}
                  position={currentStep + 1}
                  className="text-plan-maker__stepper"
                />
                <CircleStepper
                  steps={stepsForStepper}
                  position={index + 1}
                  className="mb-xl text-plan-maker__circle-stepper"
                />
                <Divider className="text-plan-maker__divider" />
                <Card elevation="hg" className="text-plan-maker__card">
                  {steps?.[index]?.title && index !== 6 && (
                    <div className="text-plan-maker__title-wrapper">
                      <Heading>{steps?.[index]?.title}</Heading>
                      <Button
                        className="text-plan-maker__title-wrapper__button-info"
                        iconName="info"
                        variant="naked"
                        style={{
                          borderRadius: "50%",
                          width: "32px",
                          height: "32px",
                          color: "var(--color-neutral-700)",
                        }}
                      />
                    </div>
                  )}
                  {steps?.[index]?.description && (
                    <Text className="mb-sm">{steps?.[index]?.description}</Text>
                  )}
                  <Component
                    videoId={steps?.[index]?.videoId}
                    setCurrentStep={setCurrentStep}
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
                    handleSubmit={handleSubmit}
                    loading={loading}
                    setLoading={setLoading}
                    label={stepsForStepper?.[index]}
                    placeholder={steps?.[index]?.placeholder}
                    updating={updating}
                    topic={topic}
                    titles={titles}
                    itemToken={itemToken}
                    showModal={showModal}
                    setShowModal={setShowModal}
                    mediumToken={mediumToken}
                  />
                </Card>
              </>
            )}
          </div>
        );
      })}
    </div>
  );
};

export const ButtonBack = ({ children, ...props }: ButtonProps) => {
  return (
    <Button
      variant="secondary"
      className="text-plan-maker__actions-wrapper__button-back"
      data-testid="button-back"
      {...props}
    >
      {children}
    </Button>
  );
};

export const ButtonNext = ({ children, ...props }: ButtonProps) => {
  return (
    <Button
      className="text-plan-maker__actions-wrapper__button-next"
      data-testid="button-next"
      {...props}
    >
      {children}
    </Button>
  );
};

export default TextPlanMaker;
