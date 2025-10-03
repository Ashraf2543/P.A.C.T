// Date and Time helpers
export const formatTime = (seconds) => {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
};

export const formatDate = (dateString, options = {}) => {
  const defaultOptions = {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    ...options
  };
  
  return new Date(dateString).toLocaleDateString(undefined, defaultOptions);
};

export const getTimeRemaining = (endTime) => {
  const now = new Date().getTime();
  const distance = endTime - now;

  if (distance < 0) {
    return { expired: true, days: 0, hours: 0, minutes: 0, seconds: 0 };
  }

  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);

  return { expired: false, days, hours, minutes, seconds };
};

// String helpers
export const capitalize = (str) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};

export const truncate = (str, length = 50) => {
  if (str.length <= length) return str;
  return str.substring(0, length) + '...';
};

export const generateId = (length = 8) => {
  const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += chars.charAt(Math.floor(Math.random() * chars.length));
  }
  return result;
};

export const generateExamCode = () => {
  const prefix = 'EXAM';
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 5).toUpperCase();
  return `${prefix}_${timestamp}_${random}`;
};

// Number helpers
export const clamp = (number, min, max) => {
  return Math.min(Math.max(number, min), max);
};

export const randomInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

export const formatPercentage = (value, total, decimals = 1) => {
  if (total === 0) return '0%';
  const percentage = (value / total) * 100;
  return `${percentage.toFixed(decimals)}%`;
};

// Array helpers
export const shuffleArray = (array) => {
  const shuffled = [...array];
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
};

export const chunkArray = (array, size) => {
  const chunks = [];
  for (let i = 0; i < array.length; i += size) {
    chunks.push(array.slice(i, i + size));
  }
  return chunks;
};

export const uniqueArray = (array, key = null) => {
  if (key) {
    const seen = new Set();
    return array.filter(item => {
      const value = item[key];
      if (seen.has(value)) {
        return false;
      }
      seen.add(value);
      return true;
    });
  }
  return [...new Set(array)];
};

// Object helpers
export const deepClone = (obj) => {
  return JSON.parse(JSON.stringify(obj));
};

export const isEmpty = (obj) => {
  if (obj == null) return true;
  if (Array.isArray(obj)) return obj.length === 0;
  if (typeof obj === 'object') return Object.keys(obj).length === 0;
  return !obj;
};

export const getNestedValue = (obj, path, defaultValue = null) => {
  const keys = path.split('.');
  let result = obj;
  
  for (const key of keys) {
    if (result && typeof result === 'object' && key in result) {
      result = result[key];
    } else {
      return defaultValue;
    }
  }
  
  return result;
};

// Validation helpers
export const isValidEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
};

export const isNumeric = (value) => {
  return !isNaN(parseFloat(value)) && isFinite(value);
};

// Storage helpers
export const storage = {
  get: (key, defaultValue = null) => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : defaultValue;
    } catch {
      return defaultValue;
    }
  },

  set: (key, value) => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
      return true;
    } catch {
      return false;
    }
  },

  remove: (key) => {
    try {
      localStorage.removeItem(key);
      return true;
    } catch {
      return false;
    }
  },

  clear: () => {
    try {
      localStorage.clear();
      return true;
    } catch {
      return false;
    }
  }
};

// Exam-specific helpers
export const calculateGrade = (score, total) => {
  const percentage = (score / total) * 100;
  
  if (percentage >= 90) return { grade: 'A+', color: 'excellent' };
  if (percentage >= 85) return { grade: 'A', color: 'very-good' };
  if (percentage >= 80) return { grade: 'A-', color: 'good' };
  if (percentage >= 75) return { grade: 'B+', color: 'satisfactory' };
  if (percentage >= 70) return { grade: 'B', color: 'average' };
  if (percentage >= 65) return { grade: 'C+', color: 'below-average' };
  if (percentage >= 60) return { grade: 'C', color: 'needs-improvement' };
  if (percentage >= 50) return { grade: 'D', color: 'poor' };
  return { grade: 'F', color: 'fail' };
};

export const validateExamData = (examData) => {
  const errors = {};

  if (!examData.title?.trim()) {
    errors.title = 'Exam title is required';
  }

  if (!examData.duration || examData.duration < 1) {
    errors.duration = 'Duration must be at least 1 minute';
  }

  if (!examData.questions || examData.questions.length === 0) {
    errors.questions = 'At least one question is required';
  } else {
    examData.questions.forEach((question, index) => {
      if (!question.question?.trim()) {
        errors[`question_${index}`] = `Question ${index + 1} text is required`;
      }
      
      if (!question.options || question.options.length < 2) {
        errors[`options_${index}`] = `Question ${index + 1} must have at least 2 options`;
      } else {
        const emptyOptions = question.options.filter(opt => !opt.trim());
        if (emptyOptions.length > 0) {
          errors[`option_empty_${index}`] = `Question ${index + 1} has empty options`;
        }
      }

      if (question.correctAnswer === undefined || question.correctAnswer === null) {
        errors[`correct_${index}`] = `Question ${index + 1} must have a correct answer selected`;
      }
    });
  }

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

// File helpers
export const downloadFile = (content, filename, contentType = 'text/plain') => {
  const blob = new Blob([content], { type: contentType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
};

export const readFileAsText = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => resolve(e.target.result);
    reader.onerror = (e) => reject(e);
    reader.readAsText(file);
  });
};

// DOM helpers
export const scrollToElement = (elementId, offset = 0) => {
  const element = document.getElementById(elementId);
  if (element) {
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.pageYOffset - offset;

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    });
  }
};

export const isElementInViewport = (element) => {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
};

// Event helpers
export const debounce = (func, wait) => {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
};

export const throttle = (func, limit) => {
  let inThrottle;
  return function(...args) {
    if (!inThrottle) {
      func.apply(this, args);
      inThrottle = true;
      setTimeout(() => inThrottle = false, limit);
    }
  };
};