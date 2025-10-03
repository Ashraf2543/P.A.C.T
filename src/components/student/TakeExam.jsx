import React, { useState } from 'react';

const TakeExam = () => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState([]);

  const questions = [
    {
      question: "What is 2 + 2?",
      options: ["3", "4", "5", "6"],
      correctAnswer: 1
    },
    {
      question: "What is the capital of France?",
      options: ["London", "Berlin", "Paris", "Madrid"],
      correctAnswer: 2
    }
  ];

  const handleAnswerSelect = (optionIndex) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  return (
    <div className="take-exam">
      <h2>Take Exam</h2>
      <div className="exam-progress">
        Question {currentQuestion + 1} of {questions.length}
      </div>
      
      <div className="question">
        <h3>{questions[currentQuestion].question}</h3>
        <div className="options">
          {questions[currentQuestion].options.map((option, index) => (
            <button 
              key={index}
              className={answers[currentQuestion] === index ? 'selected' : ''}
              onClick={() => handleAnswerSelect(index)}
            >
              {option}
            </button>
          ))}
        </div>
      </div>

      <div className="navigation">
        <button 
          disabled={currentQuestion === 0}
          onClick={() => setCurrentQuestion(currentQuestion - 1)}
        >
          Previous
        </button>
        <button 
          disabled={currentQuestion === questions.length - 1}
          onClick={() => setCurrentQuestion(currentQuestion + 1)}
        >
          Next
        </button>
        <button>Submit Exam</button>
      </div>
    </div>
  );
};

export default TakeExam;