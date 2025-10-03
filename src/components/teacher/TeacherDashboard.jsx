import React, { useState } from 'react';
import CreateExam from './CreateExam';
import ExamList from './ExamList';
import StudentList from './StudentList';

const TeacherDashboard = () => {
  const [activeTab, setActiveTab] = useState('createExam');

  const renderContent = () => {
    switch (activeTab) {
      case 'createExam':
        return <CreateExam />;
      case 'examList':
        return <ExamList />;
      case 'studentList':
        return <StudentList />;
      default:
        return <CreateExam />;
    }
  };

  return (
    <div className="teacher-dashboard">
      <header className="dashboard-header">
        <h1>Teacher Dashboard</h1>
        <nav className="dashboard-nav">
          <button 
            className={activeTab === 'createExam' ? 'active' : ''}
            onClick={() => setActiveTab('createExam')}
          >
            Create Exam
          </button>
          <button 
            className={activeTab === 'examList' ? 'active' : ''}
            onClick={() => setActiveTab('examList')}
          >
            Exam List
          </button>
          <button 
            className={activeTab === 'studentList' ? 'active' : ''}
            onClick={() => setActiveTab('studentList')}
          >
            Student List
          </button>
        </nav>
      </header>
      
      <main className="dashboard-content">
        {renderContent()}
      </main>
    </div>
  );
};

export default TeacherDashboard;