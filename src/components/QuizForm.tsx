import React, { useState } from 'react';

type QuizFormProps = {
  onSubmit: (data: { question: string; userAnswer: string; correctAnswer: string; concept: string }) => void;
};

export function QuizForm({ onSubmit }: QuizFormProps) {
  const [question, setQuestion] = useState('');
  const [userAnswer, setUserAnswer] = useState('');
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [concept, setConcept] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ question, userAnswer, correctAnswer, concept });
    setQuestion('');
    setUserAnswer('');
    setCorrectAnswer('');
    setConcept('');
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-8">
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
          <label
            htmlFor="userAnswer"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Your Answer
          </label>
          <input
            id="userAnswer"
            type="text"
            value={userAnswer}
            onChange={(e) => setUserAnswer(e.target.value)}
            required
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-3"
            placeholder="Enter your answer"
          />
        </div>

        <div>
          <label
            htmlFor="correctAnswer"
            className="block text-sm font-medium text-gray-700 mb-2"
          >
            Correct Answer
          </label>
          <input
            id="correctAnswer"
            type="text"
            value={correctAnswer}
            onChange={(e) => setCorrectAnswer(e.target.value)}
            required
            className="w-full rounded-lg border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 px-4 py-3"
            placeholder="Enter the correct answer"
          />
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