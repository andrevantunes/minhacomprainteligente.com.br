interface CompletedEvent {
  id?: string;
  answerId?: string;
  isCorrect?: boolean;
  showAnswer?: boolean;
  isAnswered?: boolean;
  percentage?: number;
  context?: string;
}

export type { CompletedEvent };
