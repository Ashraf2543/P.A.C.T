import React from 'react';

const ExamResults = () => {
  const results = [
    { studentName: 'John Doe', score: 85, total: 100, grade: 'A' },
    { studentName: 'Jane Smith', score: 92, total: 100, grade: 'A+' },
    { studentName: 'Bob Johnson', score: 78, total: 100, grade: 'B+' }
  ];

  return (
    <div className="exam-results">
      <h2>Exam Results</h2>
      <table>
        <thead>
          <tr>
            <th>Student Name</th>
            <th>Score</th>
            <th>Total</th>
            <th>Grade</th>
            <th>Percentage</th>
          </tr>
        </thead>
        <tbody>
          {results.map((result, index) => (
            <tr key={index}>
              <td>{result.studentName}</td>
              <td>{result.score}</td>
              <td>{result.total}</td>
              <td>{result.grade}</td>
              <td>{((result.score / result.total) * 100).toFixed(1)}%</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ExamResults;