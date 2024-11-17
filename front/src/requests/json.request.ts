import { newModel } from "@/requests/model.request";

const JsonApi = newModel("bff/cached/jsons");

export const getJson = (route: string) => JsonApi.get({ route });

export const getJsonsFilter = async (endpoint: {}) => {
  if (endpoint) return JsonApi.get({ route: "filter", data: endpoint, jsonApi: false });
  return {};
};
