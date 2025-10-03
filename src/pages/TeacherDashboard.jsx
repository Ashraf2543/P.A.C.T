import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Dashboard from '../components/teacher/Dashboard';
import Exams from '../components/teacher/Exams';
import CreateExam from '../components/teacher/CreateExam';

const TeacherDashboard = () => {
  return (
    <div className="teacher-dashboard">
      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/exams" element={<Exams />} />
        <Route path="/create-exam" element={<CreateExam />} />
        <Route path="*" element={<Navigate to="/teacher" />} />
      </Routes>
    </div>
  );
};

export default TeacherDashboard;