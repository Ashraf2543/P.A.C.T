import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useExam } from '../../hooks/useExam';
import Proctoring from '../proctoring/Proctoring';
import '../../styles/exam-taking.css';

const ExamTaking = () => {
  const { examCode } = useParams();
  const navigate = useNavigate();
  
  const {
    exam,
    currentQuestion,
    answers,
    timeLeft,
    examStarted,
    startExam,
    submitExam,
    handleAnswer,
    navigateQuestion,
    loading
  } = useExam(examCode);

  const [proctoringViolations, setProctoringViolations] = useState([]);

  const handleViolation = (violation) => {
    setProctoringViolations(prev => [...prev, violation]);
    console.log('Proctoring violation:', violation);
  };

  const handleExamSubmit = async () => {
    const result = await submitExam();
    if (result.success) {
      navigate('/student/results', { 
        state: { 
          score: result.score,
          total: exam.questions.length,
          violations: proctoringViolations.length
        }
      });
    }
  };

  if (loading) {
    return (
      <div className="exam-loading">
        <div className="loading-spinner"></div>
        <p>Loading exam...</p>
      </div>
    );
  }

  if (!exam) {
    return (
      <div className="exam-error">
        <h2>Exam Not Found</h2>
        <p>The exam code "{examCode}" is invalid or has expired.</p>
        <button onClick={() => navigate('/student')} className="btn-primary">
          Back to Dashboard
        </button>
      </div>
    );
  }

  if (!examStarted) {
    return (
      <div className="exam-intro">
        <div className="exam-card">
          <h2>{exam.title}</h2>
          <p className="exam-description">{exam.description}</p>
          
          <div className="exam-info">
            <div className="info-item">
              <strong>Duration:</strong> {exam.duration} minutes
            </div>
            <div className="info-item">
              <strong>Questions:</strong> {exam.questions.length}
            </div>
            <div className="info-item">
              <strong>Code:</strong> {exam.code}
            </div>
          </div>

          <div className="proctoring-requirements">
            <h3>Proctoring Requirements</h3>
            <ul>
              <li>✅ Webcam must be enabled throughout the exam</li>
              <li>✅ Maintain focus on the screen</li>
              <li>✅ No other persons in the room</li>
              <li>✅ No switching to other applications</li>
            </ul>
          </div>

          <div className="violations-warning">
            <p>
              <strong>Note:</strong> Any proctoring violations may affect your exam results.
            </p>
          </div>

          <button onClick={startExam} className="btn-primary btn-large">
            Start Exam
          </button>
        </div>
      </div>
    );
  }

  const currentQ = exam.questions[currentQuestion];

  return (
    <div className="exam-taking-container">
      <div className="exam-main">
        <div className="exam-header">
          <div className="exam-title">
            <h2>{exam.title}</h2>
            <span className="exam-code">{exam.code}</span>
          </div>
          
          <div className="exam-controls">
            <div className="timer">
              ⏰ {Math.floor(timeLeft / 60)}:{(timeLeft % 60).toString().padStart(2, '0')}
            </div>
            <button 
              onClick={handleExamSubmit}
              className="btn-danger btn-small"
            >
              Submit Exam
            </button>
          </div>
        </div>

        <div className="exam-progress">
          <div className="progress-bar">
            <div 
              className="progress-fill"
              style={{ 
                width: `${((currentQuestion + 1) / exam.questions.length) * 100}%` 
              }}
            ></div>
          </div>
          <div className="progress-text">
            Question {currentQuestion + 1} of {exam.questions.length}
          </div>
        </div>

        <div className="question-container">
          <div className="question-card">
            <h3 className="question-text">
              {currentQ.question}
            </h3>
            
            <div className="options-list">
              {currentQ.options.map((option, index) => (
                <div 
                  key={index}
                  className={`option-item ${
                    answers[currentQ.id] === index ? 'selected' : ''
                  }`}
                  onClick={() => handleAnswer(currentQ.id, index)}
                >
                  <span className="option-letter">
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="option-text">{option}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="exam-navigation">
          <button
            className="btn-secondary"
            disabled={currentQuestion === 0}
            onClick={() => navigateQuestion(currentQuestion - 1)}
          >
            ← Previous
          </button>
          
          <div className="question-dots">
            {exam.questions.map((_, index) => (
              <button
                key={index}
                className={`dot ${
                  index === currentQuestion ? 'active' : ''
                } ${
                  answers[exam.questions[index].id] !== undefined ? 'answered' : ''
                }`}
                onClick={() => navigateQuestion(index)}
              >
                {index + 1}
              </button>
            ))}
          </div>

          <button
            className="btn-primary"
            disabled={currentQuestion === exam.questions.length - 1}
            onClick={() => navigateQuestion(currentQuestion + 1)}
          >
            Next →
          </button>
        </div>
      </div>

      <div className="proctoring-sidebar">
        <Proctoring 
          examId={exam.id} 
          onViolation={handleViolation}
        />
        
        {proctoringViolations.length > 0 && (
          <div className="violations-count">
            ⚠️ {proctoringViolations.length} proctoring alert(s)
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamTaking;