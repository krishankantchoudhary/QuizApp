import React from "react";

const Result = ({ score, restartQuiz }) => {
  return (
    <div className="text-center p-10 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Quiz Completed!</h1>
      <p className="text-lg">Your Score: {score}</p>
      <button 
        className="mt-4 bg-green-500 text-white px-6 py-2 rounded-lg hover:bg-green-700"
        onClick={restartQuiz}
      >
        Restart Quiz
      </button>
    </div>
  );
};

export default Result;
