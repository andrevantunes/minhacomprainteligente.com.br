export enum EssayStatus {
  DRAFT = "pending",
}

interface MyEssay {
  id: string;
  itemName: string;
  permalinkSlug: string;
  sendDate?: string;
  uncorrectableMessage: null | string;
  updatedAt: string;
  createdAt: string;
  status: EssayStatus;
  essay: {
    url: null | string;
  };
  correctionType: string;
}

interface BffMyEssayApiResponse {
  essays: MyEssay[];
  pagination: {
    totalPages: number;
    page?: number;
  };
}

export const serializeMyEssays = ({ essays = [], pagination }: BffMyEssayApiResponse) => ({
  pagination: {
    current: pagination.page || 1,
    total: pagination.totalPages,
  },
  myEssays: essays,
});
