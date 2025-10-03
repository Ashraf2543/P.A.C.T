import React, { useState } from 'react';
import '../../styles/teacher.css';

const ExamList = () => {
  const [exams, setExams] = useState([
    { 
      id: 1, 
      title: 'Mathematics Midterm', 
      description: 'Basic algebra and geometry questions',
      duration: 90,
      questionCount: 10,
      status: 'active',
      createdAt: '2024-01-15',
      studentsCompleted: 25
    },
    { 
      id: 2, 
      title: 'Science Quiz', 
      description: 'Physics and chemistry fundamentals',
      duration: 45,
      questionCount: 5,
      status: 'completed',
      createdAt: '2024-01-10',
      studentsCompleted: 30
    }
  ]);

  const deleteExam = (id) => {
    if (window.confirm('Are you sure you want to delete this exam?')) {
      setExams(exams.filter(exam => exam.id !== id));
    }
  };

  return (
    <div className="exam-list">
      <div className="page-header">
        <h2>Exam Management</h2>
        <p>View and manage all your created exams</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Exams</h3>
          <p className="stat-number">{exams.length}</p>
        </div>
        <div className="stat-card">
          <h3>Active Exams</h3>
          <p className="stat-number">{exams.filter(e => e.status === 'active').length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Participants</h3>
          <p className="stat-number">{exams.reduce((sum, exam) => sum + exam.studentsCompleted, 0)}</p>
        </div>
      </div>

      <div className="exams-grid">
        {exams.map(exam => (
          <div key={exam.id} className="exam-card">
            <div className="exam-header">
              <h3>{exam.title}</h3>
              <span className={`status-badge ${exam.status}`}>
                {exam.status}
              </span>
            </div>
            
            <p className="exam-description">{exam.description}</p>
            
            <div className="exam-meta">
              <div className="meta-item">
                <span className="label">Duration:</span>
                <span>{exam.duration} mins</span>
              </div>
              <div className="meta-item">
                <span className="label">Questions:</span>
                <span>{exam.questionCount}</span>
              </div>
              <div className="meta-item">
                <span className="label">Completed by:</span>
                <span>{exam.studentsCompleted} students</span>
              </div>
              <div className="meta-item">
                <span className="label">Created:</span>
                <span>{exam.createdAt}</span>
              </div>
            </div>

            <div className="exam-actions">
              <button className="btn-primary">View Results</button>
              <button className="btn-secondary">Edit</button>
              <button 
                className="btn-danger"
                onClick={() => deleteExam(exam.id)}
              >
                Delete
              </button>
            </div>
          </div>
        ))}

        {exams.length === 0 && (
          <div className="empty-state">
            <h3>No Exams Created</h3>
            <p>Create your first exam to get started</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ExamList;