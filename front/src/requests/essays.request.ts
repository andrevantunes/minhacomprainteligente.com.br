import type { Essay } from "@/types/essay.types";

import { newModel } from "./model.request";
import { serializeMyEssays, EssayStatus } from "@/helpers/essays.helper";

export type ProposalOption = { label: string; value: ProposalValue };

type ProposalValue = {
  mediumToken: string;
  permalinkSlug: string;
  correctionStyleId: number;
};

const EssayApi = newModel("essay_submissions");
const EssayBffApi = newModel("bff/cached/essays/proposals");
const EssayBffUserApi = newModel("bff/user/essays");

export const getEssayProposals = async (): Promise<ProposalOption[]> => {
  return fetch(`${process.env.NEXT_PUBLIC_API_HOST}pages/proposals`).then((r) => r.json()).then(x => x.value.proposals);
};
export const findEssayProposals = async (medium_token: string): Promise<ProposalOption[]> => {
  return EssayBffApi.get(medium_token);
};

interface EssayProposalApiRequest {
  mediumToken: string;
  batteryToken: string;
  permalinkSlug: string;
  correctionStyleId: number;
  correctionType: string;
  file: string;
}

export const sendEssayProposal = async (proposal: EssayProposalApiRequest) => {
  // TODO: remove this request when the API has this pending essay logic
  const pendingEssay = await EssayApi.get().then((result = []) => {
    return result.find(
      ({ status, permalinkSlug }: any) =>
        status === EssayStatus.DRAFT && permalinkSlug === proposal.permalinkSlug
    );
  });

  if (pendingEssay) {
    return updateEssay(pendingEssay.id, { essay: proposal.file });
  }

  const data = {
    permalink_slug: proposal.permalinkSlug,
    correction_style_id: proposal.correctionStyleId,
    essay: proposal.file,
    correction_type: proposal.correctionType,
    medium_token: proposal.mediumToken,
    prep_test_battery_token: proposal.batteryToken,
  };
  return EssayApi.post({ data });
};

export const getEssaySubmissions = async (page = "1") => {
  return EssayBffUserApi.get({ data: { per_page: 10, page } }).then(serializeMyEssays);
};

export const getEssay = async (id: string): Promise<Essay> => {
  return EssayApi.request({ method: "GET", route: id })
    .then(({ data }) => data)
    .catch(() => ({}));
};

export const updateEssay = async (id: string, data: any) => {
  return EssayApi.request({ method: "PUT", route: id, data });
};
