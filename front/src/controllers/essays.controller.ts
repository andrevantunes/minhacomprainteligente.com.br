import { newModel } from "@/requests/model.request";
import { getEssaySubmissions, updateEssay } from "@/requests/essays.request";

export { getEssay } from "@/requests/essays.request";

export const getMyEssays = async () => {
  const query = new URLSearchParams(location.search);
  const page = query.get("page") || "1";
  return getEssaySubmissions(page);
};

const BffEssayApi = newModel("bff/cached/essays");
export const getEssayWeekly = async () => BffEssayApi.get("weekly");

export const cancelEssay = async (id: string) => updateEssay(id, { status: "cancelled" });
