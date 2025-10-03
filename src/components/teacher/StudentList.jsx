import React from 'react';

const StudentList = () => {
  const students = [
    { id: 1, name: 'John Doe', email: 'john@example.com', class: '10A' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', class: '10B' }
  ];

  return (
    <div className="student-list">
      <h2>Student List</h2>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Class</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {students.map(student => (
            <tr key={student.id}>
              <td>{student.name}</td>
              <td>{student.email}</td>
              <td>{student.class}</td>
              <td>
                <button>View Results</button>
                <button>Message</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default StudentList;