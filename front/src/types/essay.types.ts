interface Essay {
  id: string;
  permalinkSlug: string;
  itemName: string;
  draft: {};
  draftFeedback: null;
  gradeFinal: number;
  feedback: string | null;
  uncorrectableMessage: string | null;
  appearance: {
    rotation: number;
  };
  essay: {
    url: string;
  };
  correctedEssay: {
    url: string | null;
  };
  essayMarks: Array<{
    id: string;
    markType: string;
    description: string;
    coordinate: {
      x: number;
      y: number;
    };
  }>;
  essaySubmissionGrades: Array<{
    id: string;
    grade: number | null;
    correctionStyleCriterium: {
      id: number;
      name: string;
      description: string | null;
      values: number[];
      maxGrade: unknown;
      position: unknown | null;
      videoId: string | null;
      correctionStyleCriteriaChecks: unknown[];
    };
  }>;
  rating: number | null;
  [key: string]: unknown;
}

export type { Essay };
