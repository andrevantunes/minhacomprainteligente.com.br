import { newModel } from "./model.request";

const EducationLevelsApi = newModel("education_levels");
const ObjectivesApi = newModel("objectives");
const UserApi = newModel("user");

export const getProfileEducation = async () => {
  return Promise.all([EducationLevelsApi.get(), ObjectivesApi.get()]).then(
    ([educations, objectives]) => ({
      educations: educations.map(mapperOptions),
      objectives: objectives.map(mapperOptions),
    })
  );
};

const mapperOptions = (data: { id: string; name: string }) => ({
  label: data.name,
  value: Number(data.id),
});

export const recoverPassword = (email: string) =>
  UserApi.post({ route: "password", data: { email }, jsonApi: false });

export const updateObjective = (objectiveId: number) =>
  UserApi.put({ route: "profiles", data: { objective_id: objectiveId } });
