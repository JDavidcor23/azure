export type QuizEntry = {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  concept: string;
  timestamp: number;
};

export type TabType = 'form' | 'success' | 'errors';