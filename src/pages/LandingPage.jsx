import React from 'react';
import { Link } from 'react-router-dom';
import Header from '../components/common/Header';
import Footer from '../components/common/Footer';
import '../styles/landing.css';

const LandingPage = () => {
  return (
    <div className="landing-page">
      <Header />
      
      {/* Hero Section */}
      <section className="hero">
        <div className="hero-container">
          <div className="hero-content">
            <h1>Secure Online Examinations Made Simple</h1>
            <p>
              P.A.C.T. provides industry-leading proctoring technology to ensure 
              academic integrity in online assessments. Prevent cheating with 
              advanced AI-powered monitoring.
            </p>
            <div className="hero-buttons">
              <Link to="/signup" className="btn-primary">
                Get Started Free
              </Link>
              <a href="#features" className="btn-secondary">
                Learn More
              </a>
            </div>
          </div>
          <div className="hero-image">
            <div className="placeholder-image">Dashboard Preview</div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section id="features" className="features">
        <div className="container">
          <h2>Advanced Anti-Cheating Features</h2>
          <div className="features-grid">
            {features.map((feature, index) => (
              <div key={index} className="feature-card">
                <div className="feature-icon">{feature.icon}</div>
                <h3>{feature.title}</h3>
                <p>{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section id="how-it-works" className="how-it-works">
        <div className="container">
          <h2>How P.A.C.T. Works</h2>
          <div className="steps">
            {steps.map((step, index) => (
              <div key={index} className="step">
                <div className="step-number">{index + 1}</div>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

const features = [
  {
    icon: '🔍',
    title: 'Face Verification',
    description: 'Real-time facial recognition to verify student identity throughout the exam'
  },
  {
    icon: '🖥️',
    title: 'Full Screen Enforcement',
    description: 'Automatically enables full-screen mode to prevent unauthorized applications'
  },
  {
    icon: '📱',
    title: 'Tab Switching Detection',
    description: 'Monitors and flags any attempts to switch tabs or open new windows'
  },
  {
    icon: '🚫',
    title: 'Copy/Paste Prevention',
    description: 'Blocks right-click context menu and copy-paste functionality'
  },
  {
    icon: '📷',
    title: 'Periodic Screenshots',
    description: 'Automatically captures screenshots at regular intervals for review'
  },
  {
    icon: '🛡️',
    title: 'Multi-Display Blocking',
    description: 'Detects and prevents the use of multiple monitors'
  }
];

const steps = [
  {
    title: 'Teacher Creates Exam',
    description: 'Schedule exams with custom questions and security settings'
  },
  {
    title: 'Student Verification',
    description: 'Students verify identity via webcam before starting the exam'
  },
  {
    title: 'Secure Exam Environment',
    description: 'Automatic lockdown of the testing environment with continuous monitoring'
  },
  {
    title: 'Results & Analytics',
    description: 'Comprehensive reports with proctoring flags and performance analytics'
  }
];

export default LandingPage;