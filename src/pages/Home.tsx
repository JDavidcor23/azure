import React, { useEffect, useState } from 'react'
import QuestionList from '../components/QuestionList';
import QuestionForm from '../components/QuestionForm';
import { Download, Upload } from 'lucide-react';
import { Question } from '../types';

export const Home = () => {
  const [questions, setQuestions] = useState<Question[]>(() => {
    const saved = localStorage.getItem("quiz-questions");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("quiz-questions", JSON.stringify(questions));
  }, [questions]);

  const handleSaveQuestion = (question: Question) => {
    setQuestions([...questions, question]);
  };

  const handleDeleteQuestion = (index: number) => {
    const newQuestions = questions.filter((_, i) => i !== index);
    setQuestions(newQuestions);
  };

  const downloadJson = () => {
    const dataStr = JSON.stringify(questions, null, 2);
    const blob = new Blob([dataStr], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "quiz-questions.json";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const uploadJson = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const parsedQuestions = JSON.parse(content);
          setQuestions(parsedQuestions);
        } catch (error) {
          console.log("Error parsing JSON file", error);
        }
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex justify-between items-center flex-wrap gap-4">
          <h1 className="text-3xl font-bold text-purple-400">Quiz Manager</h1>
          <div className="flex gap-4">
            <button
              onClick={downloadJson}
              className="flex items-center gap-2 bg-purple-600 text-white px-4 py-2 rounded-lg hover:bg-purple-700 transition-colors"
            >
              <Download size={20} />
              Export JSON
            </button>
            <label className="flex items-center gap-2 bg-indigo-600 text-white px-4 py-2 rounded-lg hover:bg-indigo-700 transition-colors cursor-pointer">
              <Upload size={20} />
              Import JSON
              <input
                type="file"
                accept=".json"
                onChange={uploadJson}
                className="hidden"
              />
            </label>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-purple-400">
              Add New Question
            </h2>
            <QuestionForm
              onSave={handleSaveQuestion}
              existingQuestions={questions}
            />
          </div>

          <div className="bg-gray-800 rounded-xl shadow-lg p-6 border border-gray-700">
            <h2 className="text-xl font-semibold mb-4 text-purple-400">
              Questions List
            </h2>
            <QuestionList
              questions={questions}
              onDelete={handleDeleteQuestion}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
