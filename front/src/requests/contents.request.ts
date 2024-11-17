import { newModel } from "./model.request";

const ContentsApi = newModel("bff/cached/contents");

export const getContents = async (token?: any) => {
  const route = (typeof token === "string" ? token : location.pathname).split("/").pop();
  const contents = await ContentsApi.get(route);
  return contents;
};
