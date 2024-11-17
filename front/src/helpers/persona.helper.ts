import { Notification } from "@andrevantunes/andrevds";
import { acceptPersona, rejectPersona } from "@/controllers";

const actionsList: Record<string, FunctionPromise> = {
  acceptPersona,
  rejectPersona,
};

type FunctionPromise = () => Promise<any>;

interface HandlePersonaActions {
  action: string;
  errorText?: string;
  successText?: string;
}

export const handlePersonaActions = ({ action, errorText, successText }: HandlePersonaActions) => {
  const actionPromise = actionsList[action];
  if (!actionPromise) return Notification.error(errorText);
  return actionPromise()
    .then(() => Notification.success(successText))
    .catch(() => Notification.error(errorText));
};
