import React, { useState } from 'react';
import TakeExam from './TakeExam';
import ExamResults from './ExamResults';

const StudentDashboard = () => {
  const [activeTab, setActiveTab] = useState('takeExam');

  const renderContent = () => {
    switch (activeTab) {
      case 'takeExam':
        return <TakeExam />;
      case 'results':
        return <ExamResults />;
      default:
        return <TakeExam />;
    }
  };

  return (
    <div className="student-dashboard">
      <header className="dashboard-header">
        <h1>Student Dashboard</h1>
        <nav className="dashboard-nav">
          <button 
            className={activeTab === 'takeExam' ? 'active' : ''}
            onClick={() => setActiveTab('takeExam')}
          >
            Take Exam
          </button>
          <button 
            className={activeTab === 'results' ? 'active' : ''}
            onClick={() => setActiveTab('results')}
          >
            Results
          </button>
        </nav>
      </header>
      
      <main className="dashboard-content">
        {renderContent()}
      </main>
    </div>
  );
};

export default StudentDashboard;