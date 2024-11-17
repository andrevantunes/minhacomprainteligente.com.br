import type { UserFullProfile } from "@/types";

import { newModel } from "./model.request";
import { serializeCamelToSnakeCase } from "@/helpers/object.helper";

const UserApi = newModel("user");
const BffUserApi = newModel("bff/user");

export const validateUserToken = () => UserApi.get({ route: "validate_token" });

export const getUserProfile = (): Promise<UserFullProfile> => BffUserApi.get("profiles/full");

export const updateProfile = (data: Record<string, any>) => {
  if (data.whatsapp) data.phone = data.whatsapp;
  if (data.phone) {
    data.phone_area = data.phone.replace(/^\((\d+)\).*/, "$1");
    data.phone_number = data.phone
      .replace(/\(\d{2}\)(\s*\(\d{2}\)\s*)*/g, "")
      .replace(/[\s-]+/g, "");
  }

  const serializedData = serializeCamelToSnakeCase(data);
  return UserApi.put({ route: "profiles", data: serializedData });
};

export const updatePersonas = (data: Record<string, any>) =>
  BffUserApi.put({ route: "personas", data });

export const updateSetting = (key: string, value: string) =>
  UserApi.put({ route: `settings/${key}`, data: { value } });

export const validateB2gEmail = async (data: {}) => {
  const parameters = { ...data, route: "b2g/validate", jsonApi: false };
  if (data) return BffUserApi.get(parameters);
  return {};
};
