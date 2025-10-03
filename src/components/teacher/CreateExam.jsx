import React, { useState } from 'react';
import '../../styles/teacher.css';

const CreateExam = () => {
  const [examData, setExamData] = useState({
    title: '',
    description: '',
    duration: 60,
    questions: []
  });

  const addQuestion = () => {
    setExamData({
      ...examData,
      questions: [...examData.questions, { 
        question: '', 
        options: ['', '', '', ''], 
        correctAnswer: 0 
      }]
    });
  };

  const updateQuestion = (index, field, value) => {
    const updatedQuestions = [...examData.questions];
    updatedQuestions[index][field] = value;
    setExamData({ ...examData, questions: updatedQuestions });
  };

  const updateOption = (qIndex, oIndex, value) => {
    const updatedQuestions = [...examData.questions];
    updatedQuestions[qIndex].options[oIndex] = value;
    setExamData({ ...examData, questions: updatedQuestions });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Exam Data:', examData);
    alert('Exam created successfully!');
  };

  return (
    <div className="create-exam">
      <div className="page-header">
        <h2>Create New Exam</h2>
        <p>Design your exam by adding questions and options</p>
      </div>

      <form onSubmit={handleSubmit} className="exam-form">
        <div className="form-section">
          <h3>Exam Details</h3>
          <div className="form-row">
            <div className="form-group">
              <label>Exam Title *</label>
              <input 
                type="text" 
                value={examData.title}
                onChange={(e) => setExamData({...examData, title: e.target.value})}
                placeholder="Enter exam title"
                required
              />
            </div>
            
            <div className="form-group">
              <label>Duration (minutes) *</label>
              <input 
                type="number" 
                value={examData.duration}
                onChange={(e) => setExamData({...examData, duration: parseInt(e.target.value) || 60})}
                min="1"
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea 
              value={examData.description}
              onChange={(e) => setExamData({...examData, description: e.target.value})}
              placeholder="Enter exam description"
              rows="3"
            />
          </div>
        </div>

        <div className="form-section">
          <div className="section-header">
            <h3>Questions</h3>
            <button type="button" onClick={addQuestion} className="btn-primary">
              + Add Question
            </button>
          </div>

          {examData.questions.map((q, qIndex) => (
            <div key={qIndex} className="question-card">
              <div className="question-header">
                <h4>Question {qIndex + 1}</h4>
                <button 
                  type="button" 
                  className="btn-danger"
                  onClick={() => {
                    const updatedQuestions = examData.questions.filter((_, i) => i !== qIndex);
                    setExamData({...examData, questions: updatedQuestions});
                  }}
                >
                  Delete
                </button>
              </div>

              <div className="form-group">
                <label>Question Text *</label>
                <input 
                  type="text"
                  value={q.question}
                  onChange={(e) => updateQuestion(qIndex, 'question', e.target.value)}
                  placeholder="Enter your question"
                  required
                />
              </div>

              <div className="options-section">
                <label>Options *</label>
                {q.options.map((option, oIndex) => (
                  <div key={oIndex} className="option-row">
                    <input
                      type="radio"
                      name={`correct-${qIndex}`}
                      checked={q.correctAnswer === oIndex}
                      onChange={() => updateQuestion(qIndex, 'correctAnswer', oIndex)}
                    />
                    <input
                      type="text"
                      value={option}
                      onChange={(e) => updateOption(qIndex, oIndex, e.target.value)}
                      placeholder={`Option ${oIndex + 1}`}
                      className="option-input"
                    />
                  </div>
                ))}
              </div>
            </div>
          ))}

          {examData.questions.length === 0 && (
            <div className="empty-state">
              <p>No questions added yet. Click "Add Question" to get started.</p>
            </div>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn-primary btn-large">
            Create Exam
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateExam;