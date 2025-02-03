import React from "react";

const Home = ({ startQuiz }) => {
  return (
    
        <div className="text-center p-10 bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold mb-4">Welcome to the Quiz App</h1>
      <button 
        className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        onClick={startQuiz}
      >
        Start Quiz
      </button>
    </div>
    
  );
};

export default Home;
