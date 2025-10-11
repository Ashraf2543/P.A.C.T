const express = require('express');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();

// Public exam routes
router.get('/code/:code', (req, res) => {
  res.json({
    success: true,
    message: 'Exam code endpoint - will be implemented'
  });
});

// Protected teacher routes
router.get('/teacher', protect, authorize('teacher'), (req, res) => {
  res.json({
    success: true,
    data: [
      {
        _id: '1',
        title: 'Mathematics Test',
        code: 'MATH001',
        duration: 60,
        isActive: true
      }
    ]
  });
});

// Mock endpoints for testing
router.post('/', protect, authorize('teacher'), (req, res) => {
  res.json({
    success: true,
    message: 'Exam created successfully',
    data: {
      _id: '2',
      title: req.body.title || 'New Exam',
      code: 'EXAM002'
    }
  });
});

module.exports = router;