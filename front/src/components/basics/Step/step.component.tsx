import type { StepProps } from "./step.types";

import { ButtonSizes, Caption, Heading, HeadingSizes } from "@andrevantunes/andrevds";
import classNames from "classnames";

import { Button } from "@/components/adapters/Button";
import { handlePersonaActions } from "@/helpers/persona.helper";
const Step = ({ title, text, buttons, close, className, ...props }: StepProps) => {
  const cn = classNames("step", className);

  return (
    <div className={cn} {...props}>
      <Heading size={HeadingSizes.Small} className="step-title">
        {title}
      </Heading>

      <Caption as="p" className="step-caption">
        {text}
      </Caption>

      {buttons?.length > 0 && (
        <div className="step-buttons">
          {buttons.map((button, index) => {
            const { action, successText, errorText } = button;

            const handleClick = async () =>
              action && (await handlePersonaActions({ action, successText, errorText }));

            return (
              <Button size={ButtonSizes.Small} onClick={handleClick} {...button} key={index} />
            );
          })}
        </div>
      )}
    </div>
  );
};

export default Step;
