import { newModel } from "@/requests/model.request";
import { objectFieldsToDate } from "@/helpers/date.helper";

const UserPrivateClassesApi = newModel("user/mentorings");
export const getUserPrivateClasses = () =>
  UserPrivateClassesApi.get({
    data: { category: "private_class", next_only: true },
    jsonApi: false,
  }).then(privateClassesSerializer);

const privateClassesSerializer = ({ data = [], meta: pagination }: any) => {
  const parsedData = data.map(({ attributes = {} }) => attributes);
  return { pagination, data: objectFieldsToDate(parsedData, "startsAt") };
};
