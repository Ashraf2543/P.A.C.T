import React, { useState } from 'react';
import '../../styles/teacher.css';

const StudentList = () => {
  const [students, setStudents] = useState([
    { 
      id: 1, 
      name: 'John Smith', 
      email: 'john.smith@student.edu',
      class: '10A',
      examsCompleted: 5,
      averageScore: 85,
      lastActive: '2024-01-20'
    },
    { 
      id: 2, 
      name: 'Sarah Johnson', 
      email: 'sarah.j@student.edu',
      class: '10B',
      examsCompleted: 3,
      averageScore: 92,
      lastActive: '2024-01-19'
    },
    { 
      id: 3, 
      name: 'Michael Brown', 
      email: 'michael.b@student.edu',
      class: '10A',
      examsCompleted: 4,
      averageScore: 78,
      lastActive: '2024-01-18'
    },
    { 
      id: 4, 
      name: 'Emily Davis', 
      email: 'emily.d@student.edu',
      class: '10C',
      examsCompleted: 6,
      averageScore: 88,
      lastActive: '2024-01-21'
    }
  ]);

  const [searchTerm, setSearchTerm] = useState('');

  const filteredStudents = students.filter(student =>
    student.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.class.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getGradeColor = (score) => {
    if (score >= 90) return 'grade-a';
    if (score >= 80) return 'grade-b';
    if (score >= 70) return 'grade-c';
    return 'grade-d';
  };

  return (
    <div className="student-list">
      <div className="page-header">
        <h2>Student Management</h2>
        <p>View and manage all registered students</p>
      </div>

      <div className="controls-bar">
        <div className="search-box">
          <input
            type="text"
            placeholder="Search students by name, email, or class..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        <button className="btn-primary">
          + Add Student
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <h3>Total Students</h3>
          <p className="stat-number">{students.length}</p>
        </div>
        <div className="stat-card">
          <h3>Average Score</h3>
          <p className="stat-number">
            {Math.round(students.reduce((sum, student) => sum + student.averageScore, 0) / students.length)}%
          </p>
        </div>
        <div className="stat-card">
          <h3>Most Active Class</h3>
          <p className="stat-number">10A</p>
        </div>
      </div>

      <div className="students-table-container">
        <table className="students-table">
          <thead>
            <tr>
              <th>Student Name</th>
              <th>Email</th>
              <th>Class</th>
              <th>Exams Completed</th>
              <th>Average Score</th>
              <th>Last Active</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.map(student => (
              <tr key={student.id}>
                <td>
                  <div className="student-info">
                    <div className="avatar">
                      {student.name.split(' ').map(n => n[0]).join('')}
                    </div>
                    <span>{student.name}</span>
                  </div>
                </td>
                <td>{student.email}</td>
                <td>
                  <span className="class-badge">{student.class}</span>
                </td>
                <td>{student.examsCompleted}</td>
                <td>
                  <span className={`score-badge ${getGradeColor(student.averageScore)}`}>
                    {student.averageScore}%
                  </span>
                </td>
                <td>{student.lastActive}</td>
                <td>
                  <div className="action-buttons">
                    <button className="btn-primary btn-small">View Profile</button>
                    <button className="btn-secondary btn-small">Message</button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {filteredStudents.length === 0 && (
          <div className="empty-state">
            <h3>No Students Found</h3>
            <p>No students match your search criteria</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentList;