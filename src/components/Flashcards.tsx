import React, { useState } from "react";
import "./Flashcards.css";

type FlashcardProps = {
  question: string;
  answers: string[];
  concept: string;
  links: string[];
  correctAnswers: string[];
};

export const Flashcard: React.FC<FlashcardProps> = ({
  question,
  answers,
  concept,
  links,
  correctAnswers,
}) => {
  const [flipped, setFlipped] = useState(false);

  return (
    <div
      className={`flashcard ${flipped ? "flipped" : ""}`}
      onClick={() => setFlipped(!flipped)}
    >
      {!flipped ? (
        <div className="front flex flex-col gap-5">
          <h2 className="text-white text-lg">Question</h2>
          <h3 className="text-white">{question}</h3>
          <ul>
            {answers.map((answer, index) => (
              <li key={index}>{answer}</li>
            ))}
          </ul>
        </div>
      ) : (
        <div className="back flex flex-col gap-5">
          {correctAnswers.length > 0 && (
            <div className="flex flex-col gap-2 items-center">
              <h4>- Correct Answer{correctAnswers.length > 1 && "s"}</h4>
              <ul>
                {correctAnswers.map((answer, index) => (
                  <li key={index} className="text-purple-400 text-xl font-bold">
                    {answer}
                  </li>
                ))}
              </ul>
            </div>
          )}
          <h4 className="text-lg">- Concept</h4>
          <p>{concept}</p>
          {links.map((link, index) => (
            <a
              key={index}
              href={link}
              target="_blank"
              rel="noopener noreferrer"
              className="text-purple-400 text-lg"
            >
              - Learn more
            </a>
          ))}
        </div>
      )}
    </div>
  );
};
