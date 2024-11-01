/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Flashcard } from "../components/Flashcards";

export const FlashcardsPage: React.FC = () => {
  const questionsLocal = JSON.parse(
    localStorage.getItem("quiz-questions") || "[]"
  );
  const [order, setOrder] = useState<number[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  // Genera un orden aleatorio de índices al montar el componente
  useEffect(() => {
    const shuffledOrder = questionsLocal
      .map((_: unknown, index: number) => index)
      .sort(() => Math.random() - 0.5);
    setOrder(shuffledOrder);
  }, []);

  // Manejadores para avanzar y retroceder
  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < order.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const currentQuestion = questionsLocal[order[currentIndex]];

  return (
    <div className="min-h-screen bg-gray-900 flex items-center flex-col pt-[25px]">
      <h1 className="text-purple-400 text-3xl mb-4">Flashcards</h1>

      {/* Contador de tarjetas */}
      <div className="text-white mb-4">
        Tarjetas vistas: {currentIndex + 1} / Total: {order.length}
      </div>

      <div className="flex justify-center items-center">
        <button
          className="bg-purple-600 text-white py-2 px-4 rounded flex items-center"
          onClick={handlePrevious}
          disabled={currentIndex === 0}
        >
          Previous
        </button>

        {currentQuestion && (
          <Flashcard
            key={order[currentIndex]}
            question={currentQuestion.question}
            answers={currentQuestion.possibleAnswers}
            concept={currentQuestion.concept}
            links={currentQuestion.links}
            correctAnswers={currentQuestion.correctAnswers}
          />
        )}

        <button
          className="bg-purple-600 text-white py-2 px-4 rounded flex items-center"
          onClick={handleNext}
          disabled={currentIndex === order.length - 1}
        >
          Next
        </button>
      </div>
    </div>
  );
};
