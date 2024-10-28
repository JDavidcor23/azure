import React, { useState } from "react";
import { Flashcard } from "../components/Flashcards";
// import { FaArrowLeft, FaArrowRight } from "react-icons/fa"; // Optional: using icons for arrows

export const FlashcardsPage: React.FC = () => {
  const questionsLocal = JSON.parse(
    localStorage.getItem("quiz-questions") || "[]"
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  // Function to generate a new random index that is different from the current one
  const getRandomIndex = () => {
    let randomIndex;
    do {
      randomIndex = Math.floor(Math.random() * questionsLocal.length);
    } while (randomIndex === currentIndex);
    return randomIndex;
  };

  // Handlers for left and right arrows
  const handlePrevious = () => setCurrentIndex(getRandomIndex());
  const handleNext = () => setCurrentIndex(getRandomIndex());

  const currentQuestion = questionsLocal[currentIndex];

  return (
    <div className="min-h-screen bg-gray-900 flex items-center flex-col pt-[25px]">
      <h1 className="text-purple-400 text-3xl mb-4">Flashcards</h1>

      <div className="flex justify-center items-center">
        <button
          className="bg-purple-600 text-white py-2 px-4 rounded flex items-center"
          onClick={handlePrevious}
        >
          Previous
        </button>
        {currentQuestion && (
          <Flashcard
            key={currentIndex}
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
        >
          Next
        </button>
      </div>
    </div>
  );
};
