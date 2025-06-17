import React, { useState } from 'react';

const quizData = [
  {
    question: 'What is the capital of France?',
    options: ['Berlin', 'London', 'Paris', 'Madrid'],
    answer: 'Paris',
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
    answer: 'Mars',
  },
  {
    question: 'Who wrote "Harry Potter"?',
    options: ['J.R.R. Tolkien', 'J.K. Rowling', 'Stephen King', 'Agatha Christie'],
    answer: 'J.K. Rowling',
  },
];

export default function QuizGames() {
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [showResult, setShowResult] = useState(false);

  const handleOption = (option) => {
    if (option === quizData[current].answer) setScore(score + 1);
    if (current + 1 < quizData.length) setCurrent(current + 1);
    else setShowResult(true);
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white dark:bg-gray-900 rounded-2xl shadow-lg">
      <h2 className="text-2xl font-bold mb-4 text-blue-600 dark:text-blue-400">🎮 Quizzes & Games</h2>
      {!showResult ? (
        <div>
          <div className="mb-4 font-semibold text-lg">{quizData[current].question}</div>
          <div className="flex flex-col gap-3">
            {quizData[current].options.map(option => (
              <button
                key={option}
                className="px-4 py-2 bg-blue-100 dark:bg-blue-800 rounded hover:bg-blue-200 dark:hover:bg-blue-700 font-semibold"
                onClick={() => handleOption(option)}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ) : (
        <div className="text-center">
          <div className="text-xl font-bold mb-2">Your Score: {score} / {quizData.length}</div>
          <button className="mt-4 px-4 py-2 bg-blue-500 text-white rounded" onClick={() => { setCurrent(0); setScore(0); setShowResult(false); }}>Play Again</button>
        </div>
      )}
      <div className="mt-10 flex justify-center">
        {/* Ad Slot Example */}
        <div className="w-80 h-24 bg-gray-200 dark:bg-gray-700 rounded-xl flex items-center justify-center text-gray-500 text-lg font-semibold border-2 border-dashed border-gray-400">
          Advertisement
        </div>
      </div>
    </div>
  );
}
