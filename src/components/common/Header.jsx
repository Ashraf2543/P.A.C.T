import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <header className="navbar">
      <div className="nav-container">
        <div className="logo">
          <Link to="/">
            <h2>P.A.C.T.</h2>
          </Link>
          <span>Proctored Assessment & Cheating Thwart</span>
        </div>
        <nav className="nav-links">
          <a href="#features">Features</a>
          <a href="#how-it-works">How It Works</a>
          <a href="#contact">Contact</a>
          <div className="auth-buttons">
            {isAuthenticated ? (
              <>
                <Link 
                  to={user?.role === 'teacher' ? '/teacher' : '/'} 
                  className="btn-primary"
                >
                  Dashboard
                </Link>
                <button onClick={handleLogout} className="btn-login">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="btn-login">
                  Login
                </Link>
                <Link to="/signup" className="btn-signup">
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
};

export default Header;