import React, { useState } from 'react';
import '../../styles/student.css';

const ExamResults = () => {
  const [results] = useState([
    {
      id: 1,
      examTitle: 'Mathematics Assessment',
      dateCompleted: '2024-01-20',
      score: 85,
      totalQuestions: 10,
      timeSpent: '45:30',
      status: 'completed'
    },
    {
      id: 2,
      examTitle: 'Science Quiz',
      dateCompleted: '2024-01-18',
      score: 92,
      totalQuestions: 8,
      timeSpent: '30:15',
      status: 'completed'
    },
    {
      id: 3,
      examTitle: 'History Test',
      dateCompleted: '2024-01-15',
      score: 78,
      totalQuestions: 12,
      timeSpent: '55:45',
      status: 'completed'
    },
    {
      id: 4,
      examTitle: 'English Literature',
      dateCompleted: '2024-01-12',
      score: 88,
      totalQuestions: 15,
      timeSpent: '60:00',
      status: 'completed'
    }
  ]);

  const getGradeInfo = (score) => {
    if (score >= 90) return { grade: 'A+', color: 'grade-a-plus', remark: 'Excellent!' };
    if (score >= 85) return { grade: 'A', color: 'grade-a', remark: 'Very Good!' };
    if (score >= 80) return { grade: 'A-', color: 'grade-a-minus', remark: 'Good' };
    if (score >= 75) return { grade: 'B+', color: 'grade-b-plus', remark: 'Satisfactory' };
    if (score >= 70) return { grade: 'B', color: 'grade-b', remark: 'Average' };
    if (score >= 65) return { grade: 'C+', color: 'grade-c-plus', remark: 'Below Average' };
    if (score >= 60) return { grade: 'C', color: 'grade-c', remark: 'Needs Improvement' };
    return { grade: 'F', color: 'grade-f', remark: 'Failed' };
  };

  const getPerformanceStats = () => {
    const totalExams = results.length;
    const averageScore = results.reduce((sum, result) => sum + result.score, 0) / totalExams;
    const highestScore = Math.max(...results.map(r => r.score));
    const lowestScore = Math.min(...results.map(r => r.score));
    
    return { totalExams, averageScore, highestScore, lowestScore };
  };

  const stats = getPerformanceStats();

  return (
    <div className="exam-results">
      <div className="page-header">
        <h2>Exam Results</h2>
        <p>View your performance across all completed exams</p>
      </div>

      <div className="performance-stats">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h3>Average Score</h3>
            <p className="stat-number">{Math.round(stats.averageScore)}%</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">🏆</div>
          <div className="stat-info">
            <h3>Highest Score</h3>
            <p className="stat-number">{stats.highestScore}%</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📈</div>
          <div className="stat-info">
            <h3>Exams Completed</h3>
            <p className="stat-number">{stats.totalExams}</p>
          </div>
        </div>
        
        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-info">
            <h3>Performance Trend</h3>
            <p className="stat-trend">
              {stats.averageScore >= 80 ? 'Excellent' : 
               stats.averageScore >= 70 ? 'Good' : 'Needs Work'}
            </p>
          </div>
        </div>
      </div>

      <div className="results-list">
        <h3>Recent Exam Results</h3>
        
        {results.map(result => {
          const gradeInfo = getGradeInfo(result.score);
          
          return (
            <div key={result.id} className="result-card">
              <div className="result-header">
                <h4>{result.examTitle}</h4>
                <span className={`score-badge ${gradeInfo.color}`}>
                  {result.score}%
                </span>
              </div>
              
              <div className="result-details">
                <div className="detail-item">
                  <span className="label">Date Completed:</span>
                  <span>{result.dateCompleted}</span>
                </div>
                
                <div className="detail-item">
                  <span className="label">Time Spent:</span>
                  <span>{result.timeSpent}</span>
                </div>
                
                <div className="detail-item">
                  <span className="label">Questions:</span>
                  <span>{result.totalQuestions}</span>
                </div>
                
                <div className="detail-item">
                  <span className="label">Grade:</span>
                  <span className={`grade ${gradeInfo.color}`}>
                    {gradeInfo.grade}
                  </span>
                </div>
              </div>
              
              <div className="result-footer">
                <span className="remark">{gradeInfo.remark}</span>
                <div className="action-buttons">
                  <button className="btn-primary btn-small">
                    View Details
                  </button>
                  <button className="btn-secondary btn-small">
                    Review Answers
                  </button>
                </div>
              </div>
            </div>
          );
        })}

        {results.length === 0 && (
          <div className="empty-state">
            <h3>No Results Available</h3>
            <p>Complete your first exam to see results here</p>
          </div>
        )}
      </div>

      <div className="performance-summary">
        <h3>Performance Summary</h3>
        <div className="summary-grid">
          <div className="summary-item">
            <span>Best Subject:</span>
            <strong>Mathematics</strong>
          </div>
          <div className="summary-item">
            <span>Weakest Area:</span>
            <strong>Geometry</strong>
          </div>
          <div className="summary-item">
            <span>Improvement:</span>
            <strong className="positive">+8%</strong>
          </div>
          <div className="summary-item">
            <span>Next Goal:</span>
            <strong>90% Average</strong>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExamResults;