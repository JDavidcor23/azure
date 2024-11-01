import React, { useEffect, useState } from "react";
import { Plus, X } from "lucide-react";
import { Question, QuestionType } from "../types";

interface QuestionFormProps {
  onSave: (question: Question) => void;
  existingQuestions: Question[];
}

const QuestionForm: React.FC<QuestionFormProps> = ({
  onSave,
  existingQuestions,
}) => {
  const [type, setType] = useState<QuestionType>("single");
  const [question, setQuestion] = useState("");
  const [isDuplicate, setIsDuplicate] = useState(false); // Verifica duplicados
  const [possibleAnswers, setPossibleAnswers] = useState<string[]>([""]);
  const [correctAnswers, setCorrectAnswers] = useState<string[]>([""]);
  const [links, setLinks] = useState<string[]>([""]);
  const [concept, setConcept] = useState("");

  useEffect(() => {
    // Verifica si la pregunta ya existe ignorando mayúsculas/minúsculas
    const duplicate = existingQuestions.some(
      (q: Question) => q.question.toLowerCase() === question.toLowerCase()
    );
    setIsDuplicate(duplicate);
  }, [question, existingQuestions]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (isDuplicate) {
      alert("Esta pregunta ya existe. Por favor, escribe otra.");
      return;
    }
    const newQuestion: Question = {
      type,
      question,
      possibleAnswers: possibleAnswers.filter(Boolean),
      correctAnswers: correctAnswers.filter(Boolean),
      links: links.filter(Boolean),
      concept,
    };
    onSave(newQuestion);
    resetForm();
  };

  const resetForm = () => {
    setType("single");
    setQuestion("");
    setPossibleAnswers([""]);
    setCorrectAnswers([""]);
    setLinks([""]);
    setConcept("");
    setIsDuplicate(false);
  };

  const handleArrayInput = (
    index: number,
    value: string,
    array: string[],
    setArray: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const newArray = [...array];
    newArray[index] = value;
    setArray(newArray);
  };

  const addArrayItem = (
    array: string[],
    setArray: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    setArray([...array, ""]);
  };

  const removeArrayItem = (
    index: number,
    array: string[],
    setArray: React.Dispatch<React.SetStateAction<string[]>>
  ) => {
    const newArray = array.filter((_, i) => i !== index);
    setArray(newArray.length ? newArray : [""]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label className="block text-sm font-medium text-purple-300 mb-2">
          Question Type
        </label>
        <div className="flex gap-2">
          <label
            className={`flex-1 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 text-center ${
              type === "single"
                ? "bg-purple-400 text-white shadow-lg"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            <input
              type="radio"
              name="type"
              value="single"
              checked={type === "single"}
              onChange={(e) => setType(e.target.value as QuestionType)}
              className="hidden"
            />
            Single Select
          </label>
          <label
            className={`flex-1 px-4 py-2 rounded-lg cursor-pointer transition-all duration-200 text-center ${
              type === "multiple"
                ? "bg-purple-400 text-white shadow-lg"
                : "bg-gray-700 text-gray-300 hover:bg-gray-600"
            }`}
          >
            <input
              type="radio"
              name="type"
              value="multiple"
              checked={type === "multiple"}
              onChange={(e) => setType(e.target.value as QuestionType)}
              className="hidden"
            />
            Multiple Select
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-purple-300">
          Question
        </label>
        <div className="flex">
          <input
            type="text"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-3"
            required
          />
          {isDuplicate && (
            <button
              type="button"
              onClick={() => setQuestion("")}
              className="p-2 text-red-400 hover:text-red-300"
            >
              <X size={20} />
            </button>
          )}
        </div>
      </div>
      <div>
        <label className="block text-sm font-medium text-purple-300">
          Possible Answers
        </label>
        {possibleAnswers.map((answer, index) => (
          <div key={index} className="flex gap-2 mt-2">
            <input
              type="text"
              value={answer}
              onChange={(e) =>
                handleArrayInput(
                  index,
                  e.target.value,
                  possibleAnswers,
                  setPossibleAnswers
                )
              }
              className="flex-1 rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-3"
            />
            <button
              type="button"
              onClick={() =>
                removeArrayItem(index, possibleAnswers, setPossibleAnswers)
              }
              className="p-2 text-red-400 hover:text-red-300"
            >
              <X size={20} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem(possibleAnswers, setPossibleAnswers)}
          className="mt-2 flex items-center gap-2 text-purple-400 hover:text-purple-300"
        >
          <Plus size={20} /> Add Possible Answer
        </button>
      </div>

      <div>
        <label className="block text-sm font-medium text-purple-300">
          Correct {type === "multiple" ? "Answers" : "Answer"}
        </label>
        {correctAnswers.map((answer, index) => (
          <div key={index} className="flex gap-2 mt-2">
            <input
              type="text"
              value={answer}
              onChange={(e) =>
                handleArrayInput(
                  index,
                  e.target.value,
                  correctAnswers,
                  setCorrectAnswers
                )
              }
              className="flex-1 rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm  p-3"
            />
            <button
              type="button"
              onClick={() =>
                removeArrayItem(index, correctAnswers, setCorrectAnswers)
              }
              className="p-2 text-red-400 hover:text-red-300"
              disabled={type === "single" && correctAnswers.length <= 1}
            >
              <X size={20} />
            </button>
          </div>
        ))}
        {type === "multiple" && (
          <button
            type="button"
            onClick={() => addArrayItem(correctAnswers, setCorrectAnswers)}
            className="mt-2 flex items-center gap-2 text-purple-400 hover:text-purple-300"
          >
            <Plus size={20} /> Add Correct Answer
          </button>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-purple-300">
          Concept
        </label>
        <textarea
          value={concept}
          onChange={(e) => setConcept(e.target.value)}
          className="mt-1 block w-full rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm p-3"
          rows={3}
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-purple-300">
          Links
        </label>
        {links.map((link, index) => (
          <div key={index} className="flex gap-2 mt-2">
            <input
              type="url"
              value={link}
              onChange={(e) =>
                handleArrayInput(index, e.target.value, links, setLinks)
              }
              className="flex-1 rounded-md bg-gray-700 border-gray-600 text-white shadow-sm focus:border-purple-500 focus:ring-purple-500 sm:text-sm  p-3"
            />
            <button
              type="button"
              onClick={() => removeArrayItem(index, links, setLinks)}
              className="p-2 text-red-400 hover:text-red-300"
            >
              <X size={20} />
            </button>
          </div>
        ))}
        <button
          type="button"
          onClick={() => addArrayItem(links, setLinks)}
          className="mt-2 flex items-center gap-2 text-purple-400 hover:text-purple-300"
        >
          <Plus size={20} /> Add Link
        </button>
      </div>

      <button
        type="submit"
        className="w-full bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
      >
        Save Question
      </button>
    </form>
  );
};

export default QuestionForm;
