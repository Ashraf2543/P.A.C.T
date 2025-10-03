import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../styles/student.css';

const ExamAccess = () => {
  const [examCode, setExamCode] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAccessExam = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Mock exam validation
    setTimeout(() => {
      if (examCode === 'MATH2024' || examCode === 'SCI2024') {
        navigate(`/student/take-exam/${examCode}`);
      } else {
        alert('Invalid exam code. Please check with your teacher.');
      }
      setLoading(false);
    }, 1000);
  };

  const availableExams = [
    { code: 'MATH2024', title: 'Mathematics Final Exam', duration: '60 mins', status: 'active' },
    { code: 'SCI2024', title: 'Science Midterm', duration: '45 mins', status: 'active' },
  ];

  return (
    <div className="exam-access">
      <div className="page-header">
        <h2>Access Exam</h2>
        <p>Enter your exam code to start your assessment</p>
      </div>

      <div className="access-container">
        <div className="access-form-card">
          <h3>Enter Exam Code</h3>
          <form onSubmit={handleAccessExam} className="access-form">
            <div className="form-group">
              <label>Exam Code *</label>
              <input
                type="text"
                value={examCode}
                onChange={(e) => setExamCode(e.target.value.toUpperCase())}
                placeholder="e.g., MATH2024"
                required
                className="form-input"
              />
            </div>
            
            <button 
              type="submit" 
              className="btn-primary btn-full"
              disabled={loading || !examCode.trim()}
            >
              {loading ? 'Verifying...' : 'Access Exam'}
            </button>
          </form>
        </div>

        <div className="available-exams">
          <h3>Available Exams</h3>
          <div className="exams-list">
            {availableExams.map(exam => (
              <div key={exam.code} className="exam-item">
                <div className="exam-info">
                  <h4>{exam.title}</h4>
                  <p>Code: <strong>{exam.code}</strong></p>
                  <p>Duration: {exam.duration}</p>
                </div>
                <div className="exam-status">
                  <span className={`status-badge ${exam.status}`}>
                    {exam.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="instructions-section">
        <h3>Before You Start</h3>
        <div className="instructions-grid">
          <div className="instruction">
            <div className="instruction-icon">💻</div>
            <h4>Stable Internet</h4>
            <p>Ensure you have a reliable internet connection</p>
          </div>
          <div className="instruction">
            <div className="instruction-icon">📷</div>
            <h4>Webcam Access</h4>
            <p>Allow camera access for proctoring</p>
          </div>
          <div className="instruction">
            <div className="instruction-icon">🔊</div>
            <h4>Quiet Environment</h4>
            <p>Find a quiet space without distractions</p>
          </div>
          <div className="instruction">
            <div className="instruction-icon">⏰</div>
            <h4>Time Management</h4>
            <p>Keep track of time during the exam</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamAccess;