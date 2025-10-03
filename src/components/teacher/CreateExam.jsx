import React, { useState } from 'react';

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
      questions: [...examData.questions, { question: '', options: ['', '', '', ''], correctAnswer: 0 }]
    });
  };

  return (
    <div className="create-exam">
      <h2>Create New Exam</h2>
      <form>
        <div className="form-group">
          <label>Exam Title:</label>
          <input 
            type="text" 
            value={examData.title}
            onChange={(e) => setExamData({...examData, title: e.target.value})}
            placeholder="Enter exam title" 
          />
        </div>
        
        <div className="form-group">
          <label>Description:</label>
          <textarea 
            value={examData.description}
            onChange={(e) => setExamData({...examData, description: e.target.value})}
            placeholder="Enter exam description"
          ></textarea>
        </div>

        <div className="form-group">
          <label>Duration (minutes):</label>
          <input 
            type="number" 
            value={examData.duration}
            onChange={(e) => setExamData({...examData, duration: parseInt(e.target.value)})}
          />
        </div>

        <button type="button" onClick={addQuestion}>Add Question</button>
        <button type="submit">Create Exam</button>
      </form>
    </div>
  );
};

export default CreateExam;