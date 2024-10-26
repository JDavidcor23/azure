export type QuizEntry = {
  question: string;
  userAnswer: string;
  correctAnswer: string;
  concept: string;
  timestamp: number;
  correctAnswers?: [string];
  userAnswers?: [string];
};

export type TabType = 'form' | 'success' | 'errors';