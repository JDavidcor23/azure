import React, { useState } from "react";

type QuizFormProps = {
  onSubmit: (data: {
    question: string;
    userAnswers: string[];
    correctAnswers: string[];
    concept: string;
  }) => void;
};

export function QuizForm({ onSubmit }: Readonly<QuizFormProps>) {
  const [question, setQuestion] = useState("");
  const [userAnswers, setUserAnswers] = useState<string[]>([""]);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([""]);
  const [concept, setConcept] = useState("");
  const [mode, setMode] = useState<"oneQuestion" | "multiselect">(
    "oneQuestion"
  ); // Estado para alternar entre modos

  const handleAnswerChange = (
    index: number,
    value: string,
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const updatedAnswers = [...(mode === "multiselect" ? userAnswers : [])];
    updatedAnswers[index] = value;
    setter(updatedAnswers);
  };

  const handleAddAnswer = (
    setter: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setter((prev) => [...prev, ""]);
  };

const handleSubmit = (e: React.FormEvent) => {
  e.preventDefault();
  const answers = mode === "oneQuestion" ? [userAnswers[0] || ""] : userAnswers;
  const corrects =
    mode === "oneQuestion" ? [correctAnswers[0] || ""] : correctAnswers;

  onSubmit({
    question,
    userAnswers: answers,
    correctAnswers: corrects,
    concept,
  });

  setQuestion("");
  setUserAnswers([""]);
  setCorrectAnswers([""]);
  setConcept("");
};



  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8">
      <div className="tab-bar mb-6 flex gap-4">
        <button
          type="button"
          className={`py-2 px-4 rounded-lg ${
            mode === "oneQuestion" ? "bg-indigo-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setMode("oneQuestion")}
        >
          One Question
        </button>
        <button
          type="button"
          className={`py-2 px-4 rounded-lg ${
            mode === "multiselect" ? "bg-indigo-500 text-white" : "bg-gray-200"
          }`}
          onClick={() => setMode("multiselect")}
        >
          Multiselect
        </button>
      </div>

      <div className="space-y-6">
        <div>
          <label
            htmlFor="question"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Question
          </label>
          <input
            id="question"
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-3"
            placeholder="Enter your question"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Your {mode === "oneQuestion" ? "Answer" : "Answers"}
          </label>
          {userAnswers.map((answer, index) => (
            <input
              key={answer}
              type="text"
              value={answer}
              onChange={(e) =>
                handleAnswerChange(index, e.target.value, setUserAnswers)
              }
              required
              className="w-full mb-2 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-3"
              placeholder={`Enter ${
                mode === "oneQuestion" ? "an" : "another"
              } answer`}
            />
          ))}
          {mode === "multiselect" && (
            <button
              type="button"
              onClick={() => handleAddAnswer(setUserAnswers)}
              className="text-indigo-500 hover:underline"
            >
              Add another answer
            </button>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Correct {mode === "oneQuestion" ? "Answer" : "Answers"}
          </label>
          {correctAnswers.map((answer, index) => (
            <input
              key={answer}
              type="text"
              value={answer}
              onChange={(e) =>
                handleAnswerChange(index, e.target.value, setCorrectAnswers)
              }
              required
              className="w-full mb-2 rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-3"
              placeholder={`Enter ${
                mode === "oneQuestion" ? "the" : "another correct"
              } answer`}
            />
          ))}
          {mode === "multiselect" && (
            <button
              type="button"
              onClick={() => handleAddAnswer(setCorrectAnswers)}
              className="text-indigo-500 hover:underline"
            >
              Add another correct answer
            </button>
          )}
        </div>

        <div>
          <label
            htmlFor="concept"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Concept
          </label>
          <textarea
            id="concept"
            value={concept}
            onChange={(e) => setConcept(e.target.value)}
            required
            rows={3}
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-3"
            placeholder="Explain the concept or definition behind this question"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 font-medium"
        >
          Submit
        </button>
      </div>
    </form>
  );
}
