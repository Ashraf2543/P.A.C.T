import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../hooks/auth';
import '../styles/homepage.css';

const Homepage = () => {
  const { user } = useAuth();

  return (
    <div className="homepage">
      <header className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            P.A.C.T - Professional Assessment & Certification Tool
          </h1>
          <p className="hero-subtitle">
            A comprehensive platform for creating, taking, and managing exams with 
            advanced proctoring capabilities.
          </p>
          
          {!user ? (
            <div className="hero-actions">
              <Link to="/login" className="btn btn-primary btn-large">
                Get Started
              </Link>
              <Link to="/about" className="btn btn-secondary btn-large">
                Learn More
              </Link>
            </div>
          ) : (
            <div className="hero-actions">
              <Link 
                to={user.role === 'teacher' ? '/teacher' : '/student'} 
                className="btn btn-primary btn-large"
              >
                Go to Dashboard
              </Link>
            </div>
          )}
        </div>
        
        <div className="hero-image">
          <div className="feature-cards">
            <div className="feature-card">
              <div className="feature-icon">🎯</div>
              <h3>Smart Proctoring</h3>
              <p>AI-powered monitoring for secure exams</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">⚡</div>
              <h3>Quick Setup</h3>
              <p>Create exams in minutes</p>
            </div>
            <div className="feature-card">
              <div className="feature-icon">📊</div>
              <h3>Detailed Analytics</h3>
              <p>Comprehensive performance insights</p>
            </div>
          </div>
        </div>
      </header>

      <section className="features-section">
        <div className="container">
          <h2 className="section-title">Why Choose P.A.C.T?</h2>
          <div className="features-grid">
            <div className="feature">
              <div className="feature-icon">🔒</div>
              <h3>Secure Testing</h3>
              <p>Advanced proctoring with face detection and screen monitoring</p>
            </div>
            <div className="feature">
              <div className="feature-icon">📱</div>
              <h3>Responsive Design</h3>
              <p>Works seamlessly on all devices and screen sizes</p>
            </div>
            <div className="feature">
              <div className="feature-icon">🚀</div>
              <h3>Fast & Reliable</h3>
              <p>Built with modern technologies for optimal performance</p>
            </div>
            <div className="feature">
              <div className="feature-icon">👨‍🏫</div>
              <h3>Teacher Friendly</h3>
              <p>Intuitive interface for easy exam management</p>
            </div>
          </div>
        </div>
      </section>

      <section className="cta-section">
        <div className="container">
          <h2>Ready to Transform Your Assessment Process?</h2>
          <p>Join thousands of educators and students using P.A.C.T</p>
          {!user && (
            <Link to="/signup" className="btn btn-primary btn-large">
              Create Free Account
            </Link>
          )}
        </div>
      </section>
    </div>
  );
};

export default Homepage;