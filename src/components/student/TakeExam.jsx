import React, { useState, useEffect } from 'react';
import '../../styles/student.css';

const TakeExam = () => {
  const [currentExam, setCurrentExam] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(3600); // 60 minutes in seconds
  const [examStarted, setExamStarted] = useState(false);

  // Mock exam data
  const exam = {
    id: 1,
    title: 'Mathematics Assessment',
    description: 'Basic algebra and geometry questions',
    duration: 60,
    questions: [
      {
        id: 1,
        question: "What is the solution to the equation: 2x + 5 = 15?",
        options: ["x = 5", "x = 10", "x = 7.5", "x = 6"],
        type: "multiple-choice"
      },
      {
        id: 2,
        question: "Calculate the area of a circle with radius 7cm. (Use π = 3.14)",
        options: ["153.86 cm²", "154 cm²", "150 cm²", "147 cm²"],
        type: "multiple-choice"
      },
      {
        id: 3,
        question: "Which of the following are prime numbers?",
        options: ["2, 3, 5, 7", "4, 6, 8, 9", "1, 2, 3, 4", "11, 13, 15, 17"],
        type: "multiple-choice"
      },
      {
        id: 4,
        question: "Solve for y: 3y - 7 = 14",
        options: ["y = 7", "y = 9", "y = 8", "y = 6"],
        type: "multiple-choice"
      }
    ]
  };

  useEffect(() => {
    setCurrentExam(exam);
  }, []);

  useEffect(() => {
    let timer;
    if (examStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleSubmitExam();
    }
    return () => clearInterval(timer);
  }, [examStarted, timeLeft]);

  const startExam = () => {
    setExamStarted(true);
    setTimeLeft(exam.duration * 60);
  };

  const handleAnswerSelect = (questionId, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const handleSubmitExam = () => {
    const score = calculateScore();
    alert(`Exam submitted! Your score: ${score}/${exam.questions.length}`);
    setExamStarted(false);
    setCurrentQuestion(0);
    setAnswers({});
  };

  const calculateScore = () => {
    // Mock scoring - in real app, this would compare with correct answers
    return Object.keys(answers).length;
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  if (!currentExam) {
    return <div>Loading exam...</div>;
  }

  if (!examStarted) {
    return (
      <div className="exam-intro">
        <div className="exam-card">
          <h2>{currentExam.title}</h2>
          <p className="exam-description">{currentExam.description}</p>
          
          <div className="exam-info">
            <div className="info-item">
              <strong>Duration:</strong> {currentExam.duration} minutes
            </div>
            <div className="info-item">
              <strong>Questions:</strong> {currentExam.questions.length}
            </div>
            <div className="info-item">
              <strong>Type:</strong> Multiple Choice
            </div>
          </div>

          <div className="instructions">
            <h3>Instructions:</h3>
            <ul>
              <li>You have {currentExam.duration} minutes to complete the exam</li>
              <li>Answer all questions before submitting</li>
              <li>You cannot go back after submitting</li>
              <li>Do not refresh the page during the exam</li>
            </ul>
          </div>

          <button onClick={startExam} className="btn-primary btn-large">
            Start Exam
          </button>
        </div>
      </div>
    );
  }

  const currentQ = currentExam.questions[currentQuestion];

  return (
    <div className="take-exam">
      <div className="exam-header">
        <h2>{currentExam.title}</h2>
        <div className="timer">
          ⏰ Time Left: {formatTime(timeLeft)}
        </div>
      </div>

      <div className="exam-progress">
        <div className="progress-bar">
          <div 
            className="progress-fill"
            style={{ width: `${((currentQuestion + 1) / currentExam.questions.length) * 100}%` }}
          ></div>
        </div>
        <div className="progress-text">
          Question {currentQuestion + 1} of {currentExam.questions.length}
        </div>
      </div>

      <div className="question-container">
        <div className="question-card">
          <h3 className="question-text">{currentQ.question}</h3>
          
          <div className="options-grid">
            {currentQ.options.map((option, index) => (
              <button
                key={index}
                className={`option-button ${answers[currentQ.id] === index ? 'selected' : ''}`}
                onClick={() => handleAnswerSelect(currentQ.id, index)}
              >
                <span className="option-letter">
                  {String.fromCharCode(65 + index)}
                </span>
                <span className="option-text">{option}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="exam-navigation">
        <button
          className="btn-secondary"
          disabled={currentQuestion === 0}
          onClick={() => setCurrentQuestion(currentQuestion - 1)}
        >
          ← Previous
        </button>
        
        <div className="question-dots">
          {currentExam.questions.map((_, index) => (
            <button
              key={index}
              className={`dot ${index === currentQuestion ? 'active' : ''} ${answers[currentExam.questions[index].id] !== undefined ? 'answered' : ''}`}
              onClick={() => setCurrentQuestion(index)}
            >
              {index + 1}
            </button>
          ))}
        </div>

        {currentQuestion === currentExam.questions.length - 1 ? (
          <button onClick={handleSubmitExam} className="btn-primary">
            Submit Exam
          </button>
        ) : (
          <button
            className="btn-primary"
            onClick={() => setCurrentQuestion(currentQuestion + 1)}
          >
            Next →
          </button>
        )}
      </div>
    </div>
  );
};

export default TakeExam;