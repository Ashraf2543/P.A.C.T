const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
  question: {
    type: String,
    required: [true, 'Please add a question text'],
    trim: true
  },
  questionType: {
    type: String,
    enum: ['multiple-choice', 'true-false', 'short-answer'],
    default: 'multiple-choice'
  },
  options: [{
    type: String,
    required: true
  }],
  correctAnswer: {
    type: Number,
    required: function() {
      return this.questionType === 'multiple-choice';
    }
  },
  points: {
    type: Number,
    default: 1
  },
  explanation: {
    type: String,
    default: ''
  }
});

const examSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, 'Please add an exam title'],
    trim: true,
    maxlength: [100, 'Title cannot be more than 100 characters']
  },
  description: {
    type: String,
    trim: true,
    maxlength: [500, 'Description cannot be more than 500 characters']
  },
  code: {
    type: String,
    required: true,
    unique: true,
    uppercase: true
  },
  teacher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  questions: [questionSchema],
  duration: {
    type: Number, // in minutes
    required: true,
    min: [1, 'Duration must be at least 1 minute']
  },
  totalPoints: {
    type: Number,
    default: 0
  },
  passingScore: {
    type: Number,
    default: 60
  },
  isActive: {
    type: Boolean,
    default: true
  },
  isScheduled: {
    type: Boolean,
    default: false
  },
  scheduledDate: {
    type: Date
  },
  scheduledTime: {
    type: String
  },
  timezone: {
    type: String,
    default: 'UTC'
  },
  maxAttempts: {
    type: Number,
    default: 1
  },
  showResults: {
    type: Boolean,
    default: true
  },
  proctoringSettings: {
    webcamRequired: {
      type: Boolean,
      default: true
    },
    fullscreenRequired: {
      type: Boolean,
      default: true
    },
    tabSwitchAllowed: {
      type: Boolean,
      default: false
    },
    maxViolations: {
      type: Number,
      default: 5
    }
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

// Calculate total points before saving
examSchema.pre('save', function(next) {
  this.totalPoints = this.questions.reduce((total, question) => total + question.points, 0);
  this.updatedAt = Date.now();
  next();
});

// Generate unique exam code
examSchema.pre('save', async function(next) {
  if (!this.code) {
    const generateCode = () => {
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
      let result = '';
      for (let i = 0; i < 6; i++) {
        result += chars.charAt(Math.floor(Math.random() * chars.length));
      }
      return result;
    };

    let code;
    let exists = true;
    
    while (exists) {
      code = generateCode();
      const exam = await mongoose.model('Exam').findOne({ code });
      exists = !!exam;
    }
    
    this.code = code;
  }
  next();
});

module.exports = mongoose.model('Exam', examSchema);