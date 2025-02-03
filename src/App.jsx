import React, { useState } from "react";
import Home from "./Components/Home";
import Quiz from "./Components/Quiz";
import Result from "./Components/Result";

const App = () => {
  const [quizStarted, setQuizStarted] = useState(false);
  const [score, setScore] = useState(0);
  const [quizCompleted, setQuizCompleted] = useState(false);

  return (
    <div className="h-screen w-full bg-gradient-to-r from-[#bdc3c7] to-[#2c3e50] flex justify-center items-center">
      <div className=" shadow-lg rounded-lg p-10 w-full max-w-md ">
        {!quizStarted ? (
          <Home startQuiz={() => setQuizStarted(true)} />
        ) : !quizCompleted ? (
          <Quiz
            onQuizEnd={(finalScore) => {
              setScore(finalScore);
              setQuizCompleted(true);
            }}
          />
        ) : (
          <Result
            score={score}
            restartQuiz={() => {
              setQuizStarted(false);
              setQuizCompleted(false);
              setScore(0);
            }}
          />
        )}
      </div>
    </div>
  );
};

export default App;
