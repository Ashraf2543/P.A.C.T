import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './hooks/useAuth';
import LandingPage from './pages/LandingPage';
import TeacherDashboard from './pages/TeacherDashboard';
import StudentExam from './pages/StudentExam';
import Login from './components/auth/Login';
import Signup from './components/auth/Signup';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children, requireAuth = true }) => {
  const { user, loading } = useAuth();
  
  if (loading) {
    return <div className="loading">Loading...</div>;
  }
  
  if (requireAuth && !user) {
    return <Navigate to="/login" />;
  }
  
  if (!requireAuth && user) {
    return <Navigate to={user.role === 'teacher' ? '/teacher' : '/'} />;
  }
  
  return children;
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<LandingPage />} />
            <Route 
              path="/login" 
              element={
                <ProtectedRoute requireAuth={false}>
                  <Login />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/signup" 
              element={
                <ProtectedRoute requireAuth={false}>
                  <Signup />
                </ProtectedRoute>
              } 
            />
            
            {/* Student Exam Access (Public with code) */}
            <Route path="/exam/:code" element={<StudentExam />} />
            
            {/* Teacher Protected Routes */}
            <Route 
              path="/teacher/*" 
              element={
                <ProtectedRoute>
                  <TeacherDashboard />
                </ProtectedRoute>
              } 
            />
            
            {/* Catch all route */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;