import { useState, useEffect } from 'react';

export const useExam = (examCode) => {
  const [exam, setExam] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(0);
  const [examStarted, setExamStarted] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  // Mock exam data - replace with API call
  const mockExams = {
    'MATH2024': {
      id: 1,
      code: 'MATH2024',
      title: 'Mathematics Final Exam',
      description: 'Comprehensive mathematics assessment covering algebra and geometry',
      duration: 60, // minutes
      questions: [
        {
          id: 1,
          question: "What is the solution to the equation: 2x + 5 = 15?",
          options: ["x = 5", "x = 10", "x = 7.5", "x = 6"],
          correctAnswer: 0
        },
        {
          id: 2,
          question: "Calculate the area of a circle with radius 7cm. (Use π = 3.14)",
          options: ["153.86 cm²", "154 cm²", "150 cm²", "147 cm²"],
          correctAnswer: 0
        },
        {
          id: 3,
          question: "Which of the following are prime numbers?",
          options: ["2, 3, 5, 7", "4, 6, 8, 9", "1, 2, 3, 4", "11, 13, 15, 17"],
          correctAnswer: 0
        },
        {
          id: 4,
          question: "Solve for y: 3y - 7 = 14",
          options: ["y = 7", "y = 9", "y = 8", "y = 6"],
          correctAnswer: 0
        },
        {
          id: 5,
          question: "What is the value of 5² + 3³?",
          options: ["34", "52", "28", "45"],
          correctAnswer: 1
        }
      ]
    },
    'SCI2024': {
      id: 2,
      code: 'SCI2024',
      title: 'Science Midterm',
      description: 'Physics and chemistry fundamentals quiz',
      duration: 45,
      questions: [
        {
          id: 1,
          question: "What is the chemical symbol for Gold?",
          options: ["Go", "Gd", "Au", "Ag"],
          correctAnswer: 2
        },
        {
          id: 2,
          question: "Which planet is known as the Red Planet?",
          options: ["Venus", "Mars", "Jupiter", "Saturn"],
          correctAnswer: 1
        }
      ]
    }
  };

  useEffect(() => {
    loadExam();
  }, [examCode]);

  useEffect(() => {
    let timer;
    if (examStarted && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(time => {
          if (time <= 1) {
            handleAutoSubmit();
            return 0;
          }
          return time - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [examStarted, timeLeft]);

  const loadExam = async () => {
    setLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      const foundExam = mockExams[examCode];
      if (foundExam) {
        setExam(foundExam);
        setTimeLeft(foundExam.duration * 60); // Convert to seconds
      }
      setLoading(false);
    }, 1000);
  };

  const startExam = () => {
    setExamStarted(true);
  };

  const handleAnswer = (questionId, answerIndex) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: answerIndex
    }));
  };

  const navigateQuestion = (index) => {
    if (index >= 0 && index < exam.questions.length) {
      setCurrentQuestion(index);
    }
  };

  const calculateScore = () => {
    let score = 0;
    exam.questions.forEach(question => {
      if (answers[question.id] === question.correctAnswer) {
        score++;
      }
    });
    return score;
  };

  const handleAutoSubmit = () => {
    if (!submitted) {
      submitExam();
    }
  };

  const submitExam = async () => {
    setSubmitted(true);
    setExamStarted(false);
    
    const score = calculateScore();
    const total = exam.questions.length;
    
    // Simulate API submission
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve({
          success: true,
          score,
          total,
          percentage: Math.round((score / total) * 100)
        });
      }, 1500);
    });
  };

  const getExamProgress = () => {
    if (!exam) return 0;
    const answered = Object.keys(answers).length;
    return (answered / exam.questions.length) * 100;
  };

  const getTimeSpent = () => {
    const totalTime = exam ? exam.duration * 60 : 0;
    const spent = totalTime - timeLeft;
    const minutes = Math.floor(spent / 60);
    const seconds = spent % 60;
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return {
    exam,
    currentQuestion,
    answers,
    timeLeft,
    examStarted,
    loading,
    submitted,
    startExam,
    submitExam,
    handleAnswer,
    navigateQuestion,
    getExamProgress,
    getTimeSpent,
    calculateScore
  };
};