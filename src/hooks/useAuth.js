import React, { createContext, useContext, useState, useEffect } from 'react';
import { authAPI } from '../services/api';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkAuthStatus();
  }, []);

  const checkAuthStatus = async () => {
    try {
      const token = localStorage.getItem('pact_token');
      if (token) {
        const userData = JSON.parse(localStorage.getItem('pact_user'));
        setUser(userData);
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('pact_token');
      localStorage.removeItem('pact_user');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      // Simulate API call - replace with actual API
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Mock response - replace with actual API call
      const mockUser = {
        id: 1,
        name: 'John Doe',
        email: email,
        role: 'teacher',
        organization: 'Demo University'
      };
      
      const mockToken = 'mock_jwt_token_' + Date.now();
      
      localStorage.setItem('pact_token', mockToken);
      localStorage.setItem('pact_user', JSON.stringify(mockUser));
      setUser(mockUser);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const signup = async (userData) => {
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      return { 
        success: true, 
        message: 'Account created successfully! Please check your email for verification.' 
      };
    } catch (error) {
      return { success: false, error: error.message };
    }
  };

  const verifyOTP = async (email, otp) => {
    try {
      // Simulate OTP verification
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      const mockUser = {
        id: 1,
        name: email.split('@')[0],
        email: email,
        role: 'teacher',
        organization: 'Demo University'
      };
      
      const mockToken = 'mock_jwt_token_' + Date.now();
      
      localStorage.setItem('pact_token', mockToken);
      localStorage.setItem('pact_user', JSON.stringify(mockUser));
      setUser(mockUser);
      
      return { success: true };
    } catch (error) {
      return { success: false, error: 'Invalid OTP code' };
    }
  };

  const logout = () => {
    localStorage.removeItem('pact_token');
    localStorage.removeItem('pact_user');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    signup,
    verifyOTP,
    logout,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};