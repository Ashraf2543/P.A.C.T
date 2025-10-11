const mongoose = require('mongoose');

const violationSchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ['NO_FACE', 'MULTIPLE_FACES', 'TAB_SWITCH', 'FULLSCREEN_EXIT', 'DEVTOOLS_OPEN']
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  severity: {
    type: String,
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  message: {
    type: String,
    required: true
  }
});

const answerSchema = new mongoose.Schema({
  questionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true
  },
  selectedAnswer: {
    type: Number // For multiple choice, index of selected option
  },
  answerText: {
    type: String // For short answers
  },
  isCorrect: {
    type: Boolean
  },
  pointsEarned: {
    type: Number,
    default: 0
  },
  timeSpent: {
    type: Number, // in seconds
    default: 0
  }
});

const examAttemptSchema = new mongoose.Schema({
  student: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: true
  },
  answers: [answerSchema],
  startTime: {
    type: Date,
    required: true
  },
  endTime: {
    type: Date
  },
  timeSpent: {
    type: Number, // in seconds
    default: 0
  },
  score: {
    type: Number,
    default: 0
  },
  totalPoints: {
    type: Number,
    default: 0
  },
  percentage: {
    type: Number,
    default: 0
  },
  status: {
    type: String,
    enum: ['in-progress', 'completed', 'submitted', 'terminated'],
    default: 'in-progress'
  },
  violations: [violationSchema],
  violationCount: {
    type: Number,
    default: 0
  },
  isFlagged: {
    type: Boolean,
    default: false
  },
  ipAddress: {
    type: String
  },
  userAgent: {
    type: String
  },
  screenshots: [{
    timestamp: Date,
    imageUrl: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate score and percentage before saving
examAttemptSchema.pre('save', function(next) {
  if (this.answers.length > 0) {
    this.score = this.answers.reduce((total, answer) => total + (answer.pointsEarned || 0), 0);
    this.percentage = this.totalPoints > 0 ? (this.score / this.totalPoints) * 100 : 0;
  }
  
  this.violationCount = this.violations.length;
  this.isFlagged = this.violationCount > 5; // Default max violations
  
  next();
});

module.exports = mongoose.model('ExamAttempt', examAttemptSchema);