import React, { useState, useEffect } from "react";
import { fetchQuizData } from "../QuizService";

const Quiz = ({ onQuizEnd }) => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadQuiz = async () => {
      try {
        const data = await fetchQuizData();
        if (data.length > 0) {
          // Preprocess questions: Shuffle options
          const processedQuestions = data.map((question) => ({
            ...question,
            options: shuffleArray([...question.incorrect_answers, question.correct_answer]),
          }));
          setQuestions(processedQuestions);
        } else {
          console.error("Quiz data is empty.");
        }
      } catch (error) {
        console.error("Error fetching quiz data:", error);
      } finally {
        setLoading(false);
      }
    };
    loadQuiz();
  }, []);

  // Function to shuffle answer options
  const shuffleArray = (array) => array.sort(() => Math.random() - 0.5);

  const handleAnswer = (option) => {
    if (!selectedOption) {
      setSelectedOption(option);
      if (option === questions[currentQuestion].correct_answer) {
        setScore((prevScore) => prevScore + 1);
      }
    }
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      onQuizEnd(score);
    }
  };

  if (loading) return <p className="text-center text-xl">🔄 Loading quiz...</p>;
  if (questions.length === 0) return <p className="text-center text-red-500">❌ No quiz data available.</p>;

  return (
    <div className="p-6 bg-white shadow-lg rounded-lg text-center">
      <h2 className="text-xl font-bold">{questions[currentQuestion].question}</h2>
      <div className="mt-4">
        {questions[currentQuestion].options.map((option, index) => (
          <button
            key={index}
            className={`block w-full px-4 py-2 mb-2 border rounded-lg ${
              selectedOption
                ? option === questions[currentQuestion].correct_answer
                  ? "bg-green-400 text-white"
                  : option === selectedOption
                  ? "bg-red-400 text-white"
                  : "bg-gray-200"
                : "bg-gray-200"
            }`}
            onClick={() => handleAnswer(option)}
            disabled={!!selectedOption} // Disable buttons after selection
          >
            {option}
          </button>
        ))}
      </div>
      <button
        className="mt-4 bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-700"
        onClick={nextQuestion}
        disabled={!selectedOption} // Prevent next without answer
      >
        {currentQuestion + 1 < questions.length ? "Next" : "Finish Quiz"}
      </button>
    </div>
  );
};

export default Quiz;
