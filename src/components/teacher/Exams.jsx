import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../../styles/teacher.css';

const Exams = () => {
  const [exams, setExams] = useState([
    {
      id: 1,
      title: 'Mathematics Final Exam',
      code: 'MATH2024',
      description: 'Comprehensive mathematics assessment covering algebra and geometry',
      duration: 90,
      totalQuestions: 15,
      status: 'active',
      createdAt: '2024-01-15',
      studentsCompleted: 45,
      averageScore: 78,
      submissions: 45,
      maxScore: 95,
      minScore: 45
    },
    {
      id: 2,
      title: 'Science Midterm',
      code: 'SCI2024',
      description: 'Physics and chemistry fundamentals quiz',
      duration: 45,
      totalQuestions: 10,
      status: 'active',
      createdAt: '2024-01-12',
      studentsCompleted: 38,
      averageScore: 82,
      submissions: 38,
      maxScore: 98,
      minScore: 52
    },
    {
      id: 3,
      title: 'History Quiz',
      code: 'HIST2024',
      description: 'World history multiple choice questions',
      duration: 30,
      totalQuestions: 8,
      status: 'draft',
      createdAt: '2024-01-10',
      studentsCompleted: 0,
      averageScore: 0,
      submissions: 0,
      maxScore: 0,
      minScore: 0
    }
  ]);

  const [filter, setFilter] = useState('all');

  const filteredExams = exams.filter(exam => {
    if (filter === 'all') return true;
    return exam.status === filter;
  });

  const deleteExam = (id) => {
    if (window.confirm('Are you sure you want to delete this exam? This action cannot be undone.')) {
      setExams(exams.filter(exam => exam.id !== id));
    }
  };

  const duplicateExam = (exam) => {
    const newExam = {
      ...exam,
      id: Math.max(...exams.map(e => e.id)) + 1,
      title: `${exam.title} (Copy)`,
      code: `${exam.code}_COPY`,
      status: 'draft',
      createdAt: new Date().toISOString().split('T')[0],
      studentsCompleted: 0,
      averageScore: 0,
      submissions: 0,
      maxScore: 0,
      minScore: 0
    };
    setExams([...exams, newExam]);
  };

  const toggleExamStatus = (id) => {
    setExams(exams.map(exam => 
      exam.id === id 
        ? { ...exam, status: exam.status === 'active' ? 'inactive' : 'active' }
        : exam
    ));
  };

  return (
    <div className="exams-page">
      <div className="page-header">
        <div className="header-content">
          <h2>Exam Management</h2>
          <p>Create, manage, and track all your exams</p>
        </div>
        <Link to="/teacher/create-exam" className="btn-primary">
          + Create New Exam
        </Link>
      </div>

      <div className="controls-bar">
        <div className="filter-tabs">
          <button 
            className={`tab ${filter === 'all' ? 'active' : ''}`}
            onClick={() => setFilter('all')}
          >
            All Exams ({exams.length})
          </button>
          <button 
            className={`tab ${filter === 'active' ? 'active' : ''}`}
            onClick={() => setFilter('active')}
          >
            Active ({exams.filter(e => e.status === 'active').length})
          </button>
          <button 
            className={`tab ${filter === 'draft' ? 'active' : ''}`}
            onClick={() => setFilter('draft')}
          >
            Draft ({exams.filter(e => e.status === 'draft').length})
          </button>
          <button 
            className={`tab ${filter === 'inactive' ? 'active' : ''}`}
            onClick={() => setFilter('inactive')}
          >
            Inactive ({exams.filter(e => e.status === 'inactive').length})
          </button>
        </div>

        <div className="search-box">
          <input
            type="text"
            placeholder="Search exams..."
            className="search-input"
          />
        </div>
      </div>

      <div className="exams-stats">
        <div className="stat-card">
          <h3>Total Exams</h3>
          <p className="stat-number">{exams.length}</p>
        </div>
        <div className="stat-card">
          <h3>Active Exams</h3>
          <p className="stat-number">{exams.filter(e => e.status === 'active').length}</p>
        </div>
        <div className="stat-card">
          <h3>Total Submissions</h3>
          <p className="stat-number">{exams.reduce((sum, exam) => sum + exam.submissions, 0)}</p>
        </div>
        <div className="stat-card">
          <h3>Avg. Score</h3>
          <p className="stat-number">
            {Math.round(exams.reduce((sum, exam) => sum + exam.averageScore, 0) / exams.filter(e => e.averageScore > 0).length) || 0}%
          </p>
        </div>
      </div>

      <div className="exams-table-container">
        <table className="exams-table">
          <thead>
            <tr>
              <th>Exam Title</th>
              <th>Code</th>
              <th>Questions</th>
              <th>Duration</th>
              <th>Submissions</th>
              <th>Avg. Score</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredExams.map(exam => (
              <tr key={exam.id}>
                <td>
                  <div className="exam-title-cell">
                    <h4>{exam.title}</h4>
                    <p className="exam-description">{exam.description}</p>
                  </div>
                </td>
                <td>
                  <code className="exam-code">{exam.code}</code>
                </td>
                <td>{exam.totalQuestions}</td>
                <td>{exam.duration} mins</td>
                <td>
                  <div className="submissions-cell">
                    <span className="submissions-count">{exam.submissions}</span>
                    {exam.studentsCompleted > 0 && (
                      <span className="completion-rate">
                        ({Math.round((exam.studentsCompleted / exam.submissions) * 100)}%)
                      </span>
                    )}
                  </div>
                </td>
                <td>
                  {exam.averageScore > 0 ? (
                    <div className="score-cell">
                      <span className="average-score">{exam.averageScore}%</span>
                      <div className="score-range">
                        {exam.minScore}% - {exam.maxScore}%
                      </div>
                    </div>
                  ) : (
                    <span className="no-data">No data</span>
                  )}
                </td>
                <td>
                  <span className={`status-badge ${exam.status}`}>
                    {exam.status}
                  </span>
                </td>
                <td>
                  <div className="action-buttons">
                    <Link 
                      to={`/teacher/exam/${exam.id}`}
                      className="btn-primary btn-small"
                    >
                      View
                    </Link>
                    <button 
                      className="btn-secondary btn-small"
                      onClick={() => duplicateExam(exam)}
                    >
                      Duplicate
                    </button>
                    <button 
                      className="btn-secondary btn-small"
                      onClick={() => toggleExamStatus(exam.id)}
                    >
                      {exam.status === 'active' ? 'Deactivate' : 'Activate'}
                    </button>
                    <button 
                      className="btn-danger btn-small"
                      onClick={() => deleteExam(exam.id)}
                    >
                      Delete
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredExams.length === 0 && (
          <div className="empty-state">
            <h3>No Exams Found</h3>
            <p>
              {filter === 'all' 
                ? "You haven't created any exams yet." 
                : `No ${filter} exams found.`
              }
            </p>
            <Link to="/teacher/create-exam" className="btn-primary">
              Create Your First Exam
            </Link>
          </div>
        )}
      </div>
    </div>
  );
};

export default Exams;