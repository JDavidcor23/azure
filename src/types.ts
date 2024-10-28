export type QuestionType = 'single' | 'multiple';

export interface Question {
  type: QuestionType;
  question: string;
  possibleAnswers: string[];
  correctAnswers: string[];
  links: string[];
  concept: string;
}