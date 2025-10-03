import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to add auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('pact_token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor to handle errors
api.interceptors.response.use(
  (response) => response.data,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('pact_token');
      localStorage.removeItem('pact_user');
      window.location.href = '/login';
    }
    return Promise.reject(error.response?.data || error.message);
  }
);

export const authAPI = {
  login: (email, password) => 
    api.post('/auth/login', { email, password }),

  signup: (userData) => 
    api.post('/auth/signup', userData),

  verifyOTP: (email, otp) => 
    api.post('/auth/verify-otp', { email, otp }),

  resendOTP: (email) => 
    api.post('/auth/resend-otp', { email }),

  verifyToken: () => 
    api.get('/auth/verify'),

  logout: () => 
    api.post('/auth/logout'),
};

export const teacherAPI = {
  getExams: () => api.get('/teacher/exams'),
  createExam: (examData) => api.post('/teacher/exams', examData),
  getExam: (id) => api.get(`/teacher/exams/${id}`),
  updateExam: (id, examData) => api.put(`/teacher/exams/${id}`, examData),
  deleteExam: (id) => api.delete(`/teacher/exams/${id}`),
  getResults: (examId) => api.get(`/teacher/exams/${examId}/results`),
};

export const studentAPI = {
  getExam: (code) => api.get(`/exam/access/${code}`),
  startAttempt: (attemptData) => api.post('/student/attempt/start', attemptData),
  submitAnswer: (attemptId, answerData) => api.post(`/student/attempt/${attemptId}/answer`, answerData),
  submitExam: (attemptId) => api.post(`/student/attempt/${attemptId}/submit`),
};

export default api;