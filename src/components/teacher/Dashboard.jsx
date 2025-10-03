import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import '../../../src/styles/teacher.css';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <div className="teacher-dashboard-container">
      <div className="dashboard-header">
        <h1>Welcome back, {user?.name}!
</h1>
        <p>Here's what's happening with your exams today.</p>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">📊</div>
          <div className="stat-info">
            <h3>0</h3>
            <p>Total Exams</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">📅</div>
          <div className="stat-info">
            <h3>0</h3>
            <p>Upcoming Exams</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">🟢</div>
          <div className="stat-info">
            <h3>0</h3>
            <p>Active Now</p>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>0</h3>
            <p>Total Students</p>
          </div>
        </div>
      </div>

      <div className="quick-actions">
        <h2>Quick Actions</h2>
        <div className="actions-grid">
          <Link to="/teacher/create-exam?type=instant" className="action-card">
            <div className="action-icon">⚡</div>
            <h3>Create Instant Exam</h3>
            <p>Start an exam immediately with quick setup</p>
          </Link>
          <Link to="/teacher/create-exam?type=scheduled" className="action-card">
            <div className="action-icon">📅</div>
            <h3>Schedule Exam</h3>
            <p>Plan an exam for a future date and time</p>
          </Link>
          <Link to="/teacher/exams" className="action-card">
            <div className="action-icon">📋</div>
            <h3>Manage Exams</h3>
            <p>View and edit all your created exams</p>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;