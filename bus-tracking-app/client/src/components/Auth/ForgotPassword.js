// components/Auth/ForgotPassword.js
import React, { useState } from 'react';
import authService from '../../services/authService'; // Import your authentication service

function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleForgotPassword = async () => {
    try {
      // Call your authentication service function for password reset
      await authService.forgotPassword(email);
      setMessage('Password reset instructions sent to your email.');
    } catch (error) {
      setMessage('Error: Unable to send reset instructions. Please try again.');
      console.error('Forgot Password Error:', error);
    }
  };

  return (
    <div>
      <h2>Forgot Password</h2>
      <p>Enter your email address to receive password reset instructions.</p>
      
      <div>
        <label>Email:</label>
        <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      
      <button onClick={handleForgotPassword}>Reset Password</button>

      {message && <p>{message}</p>}
    </div>
  );
}

export default ForgotPassword;
