import React, { useState, useRef } from 'react';
import { useAuth } from '../../hooks/useAuth';
import '../../styles/auth.css';

const OTPVerification = ({ email, onVerified, onClose }) => {
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const inputRefs = useRef([]);
  
  const { verifyOTP } = useAuth();

  const handleChange = (index, value) => {
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 5) {
        inputRefs.current[index + 1].focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join('');
    
    if (otpString.length !== 6) {
      alert('Please enter the complete 6-digit code');
      return;
    }

    setLoading(true);
    const result = await verifyOTP(email, otpString);
    
    if (result.success) {
      onVerified();
    } else {
      alert(result.error);
    }
    
    setLoading(false);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <div className="modal-header">
          <h3>Verify Your Email</h3>
          <p>We've sent a verification code to {email}</p>
        </div>
        
        <form onSubmit={handleSubmit} className="otp-form">
          <div className="otp-inputs">
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={el => inputRefs.current[index] = el}
                type="text"
                maxLength="1"
                className="otp-input"
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                required
              />
            ))}
          </div>
          
          <button 
            type="submit" 
            className="btn-primary btn-full"
            disabled={loading}
          >
            {loading ? 'Verifying...' : 'Verify Email'}
          </button>
        </form>
        
        <div className="otp-footer">
          <p>Didn't receive the code? <a href="#" className="link">Resend</a></p>
        </div>
      </div>
    </div>
  );
};

export default OTPVerification;