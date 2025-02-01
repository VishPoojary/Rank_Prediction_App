
import React, { useState, useEffect } from "react";

const QuizPerformance = () => {
  const [quizData, setQuizData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch quiz performance data when the component mounts
    fetch("http://127.0.0.1:5000/quiz-performance")
      .then((response) => response.json())
      .then((data) => setQuizData(data))
      .catch((err) => setError("Failed to fetch quiz data"));
  }, []);

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <p className="text-red-500 text-xl">{error}</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
          Quiz Performance & NEET Rank Prediction
        </h1>

        {quizData ? (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Quiz Scores</h2>
              <ul className="space-y-3">
                {quizData.quiz_scores.map((score, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center border-b pb-2"
                  >
                    <span className="text-lg text-gray-600">Quiz {index + 1}</span>
                    <span className="text-lg font-semibold text-gray-800">{score} points</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Predicted NEET Rank</h2>
              <p className="text-lg text-gray-800 font-medium">{quizData.predicted_rank}</p>
            </div>

            <div>
              <h2 className="text-2xl font-semibold text-gray-700 mb-4">Insights</h2>
              <p className="text-lg text-gray-600">{quizData.insights}</p>
            </div>
          </div>
        ) : (
          <p className="text-center text-lg text-gray-600">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default QuizPerformance;
