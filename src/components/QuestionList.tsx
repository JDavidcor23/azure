import React from "react";
import { Trash2 } from "lucide-react";
import { Question } from "../types";

interface QuestionListProps {
  questions: Question[];
  onDelete: (index: number) => void;
}

const QuestionList: React.FC<QuestionListProps> = ({ questions, onDelete }) => {
  if (questions.length === 0) {
    return (
      <div className="text-center text-gray-400 py-8">
        No questions added yet. Start by adding a new question!
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {questions.map((question, index) => (
        <div
          key={index}
          className="bg-gray-700 rounded-lg p-4 shadow-md hover:shadow-lg transition-shadow border border-gray-600"
        >
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-medium text-lg text-purple-300">
                {question.question}
              </h3>
              <span className="text-sm text-gray-400">
                {question.type === "single"
                  ? "Single Select"
                  : "Multiple Select"}
              </span>
            </div>
            <button
              onClick={() => onDelete(index)}
              className="text-red-400 hover:text-red-300 p-1"
            >
              <Trash2 size={20} />
            </button>
          </div>

          <div className="mt-4">
            <p className="text-gray-300">
              {question.correctAnswers[0] || "No answer provided"}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default QuestionList;
