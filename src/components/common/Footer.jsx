import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-content">
          <div className="footer-section">
            <h3>P.A.C.T.</h3>
            <p>Ensuring academic integrity in the digital age.</p>
          </div>
          <div className="footer-section">
            <h4>Quick Links</h4>
            <a href="#features">Features</a>
            <a href="#how-it-works">How It Works</a>
            <Link to="/login">Login</Link>
          </div>
          <div className="footer-section">
            <h4>Contact</h4>
            <p>Email: support@pact.com</p>
            <p>Phone: +1 (555) 123-4567</p>
          </div>
        </div>
        <div className="footer-bottom">
          <p>&copy; 2024 P.A.C.T. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;