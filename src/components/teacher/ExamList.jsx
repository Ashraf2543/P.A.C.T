import React from 'react';

const ExamList = () => {
  const exams = [
    { id: 1, title: 'Math Midterm', date: '2024-01-15', status: 'Active' },
    { id: 2, title: 'Science Quiz', date: '2024-01-10', status: 'Completed' }
  ];

  return (
    <div className="exam-list">
      <h2>Exam List</h2>
      <table>
        <thead>
          <tr>
            <th>Title</th>
            <th>Date</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {exams.map(exam => (
            <tr key={exam.id}>
              <td>{exam.title}</td>
              <td>{exam.date}</td>
              <td>{exam.status}</td>
              <td>
                <button>View</button>
                <button>Edit</button>
                <button>Delete</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExamList;