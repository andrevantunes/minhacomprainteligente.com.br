import { updatePersonas } from "@/requests";

export const acceptPersona = () => updatePersonas({ finished: true, accepted: true });
export const rejectPersona = () => {
  return updatePersonas({ finished: true, accepted: false }).then((response) => {
    location.reload();
    return response;
  });
};

export { validateB2gEmail } from "@/requests/user.request";
