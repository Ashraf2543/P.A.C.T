import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import '../../styles/exam-result.css';

const ExamResult = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const result = location.state || {
    score: 8,
    total: 10,
    violations: 0,
    examTitle: 'Mathematics Assessment',
    date: new Date().toLocaleDateString(),
    timeSpent: '45:30'
  };

  const percentage = Math.round((result.score / result.total) * 100);
  
  const getGradeInfo = (score) => {
    if (score >= 90) return { grade: 'A+', color: 'excellent', remark: 'Outstanding Performance!' };
    if (score >= 80) return { grade: 'A', color: 'very-good', remark: 'Excellent Work!' };
    if (score >= 70) return { grade: 'B', color: 'good', remark: 'Good Performance' };
    if (score >= 60) return { grade: 'C', color: 'average', remark: 'Satisfactory' };
    return { grade: 'D', color: 'poor', remark: 'Needs Improvement' };
  };

  const gradeInfo = getGradeInfo(percentage);

  const getPerformanceStats = () => {
    const correct = result.score;
    const incorrect = result.total - result.score;
    const skipped = 0; // You can track this in your exam state
    
    return { correct, incorrect, skipped };
  };

  const stats = getPerformanceStats();

  return (
    <div className="exam-result">
      <div className="result-header">
        <h1>Exam Results</h1>
        <p>Detailed performance analysis</p>
      </div>

      <div className="result-summary">
        <div className="score-card">
          <div className="score-circle">
            <div className="score-value">
              <span className="score-number">{percentage}</span>
              <span className="score-percent">%</span>
            </div>
            <div className="score-grade">{gradeInfo.grade}</div>
          </div>
          
          <div className="score-details">
            <h2>{result.examTitle}</h2>
            <p className="score-remark">{gradeInfo.remark}</p>
            
            <div className="score-breakdown">
              <div className="breakdown-item">
                <span className="label">Correct Answers:</span>
                <span className="value correct">{stats.correct}/{result.total}</span>
              </div>
              <div className="breakdown-item">
                <span className="label">Incorrect Answers:</span>
                <span className="value incorrect">{stats.incorrect}</span>
              </div>
              <div className="breakdown-item">
                <span className="label">Time Spent:</span>
                <span className="value">{result.timeSpent}</span>
              </div>
              {result.violations > 0 && (
                <div className="breakdown-item">
                  <span className="label">Proctoring Alerts:</span>
                  <span className="value violations">{result.violations}</span>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className="performance-metrics">
        <h3>Performance Metrics</h3>
        <div className="metrics-grid">
          <div className="metric-card">
            <div className="metric-icon">🎯</div>
            <div className="metric-info">
              <h4>Accuracy</h4>
              <p className="metric-value">{percentage}%</p>
            </div>
          </div>
          
          <div className="metric-card">
            <div className="metric-icon">⚡</div>
            <div className="metric-info">
              <h4>Speed</h4>
              <p className="metric-value">Good</p>
            </div>
          </div>
          
          <div className="metric-card">
            <div className="metric-icon">📊</div>
            <div className="metric-info">
              <h4>Completion</h4>
              <p className="metric-value">100%</p>
            </div>
          </div>
          
          <div className="metric-card">
            <div className="metric-icon">🔒</div>
            <div className="metric-info">
              <h4>Integrity</h4>
              <p className="metric-value">
                {result.violations === 0 ? 'Excellent' : 'Review Needed'}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="answer-review">
        <h3>Answer Review</h3>
        <div className="review-section">
          <div className="correct-answers">
            <h4>Correct Answers ({stats.correct})</h4>
            <p>All your correct answers have been recorded successfully.</p>
          </div>
          
          {stats.incorrect > 0 && (
            <div className="incorrect-answers">
              <h4>Areas for Improvement ({stats.incorrect})</h4>
              <p>Review these topics for better performance next time.</p>
            </div>
          )}
        </div>
      </div>

      <div className="result-actions">
        <Link to="/student/take-exam" className="btn btn-secondary">
          Take Another Exam
        </Link>
        <button className="btn btn-primary">
          Download Result
        </button>
        <Link to="/student" className="btn btn-outline">
          Back to Dashboard
        </Link>
      </div>

      {result.violations > 0 && (
        <div className="proctoring-alert">
          <div className="alert-header">
            <h4>⚠️ Proctoring Notice</h4>
          </div>
          <p>
            Your exam session had {result.violations} proctoring alert(s). 
            Please ensure you follow all exam guidelines in future attempts.
          </p>
        </div>
      )}
    </div>
  );
};

export default ExamResult;