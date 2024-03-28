// ForgotPassword.js
import React, { useState } from 'react';
import './ForgotPassword.css';
// import { useNavigate } from "react-router-dom";

const ForgotPassword = () => {
    // const navigate = useNavigate();
  const [email, setEmail] = useState('');

  const handleChange = (e) => {
    setEmail(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your password reset logic here
    console.log('Password reset request for email:', email);
    // You can send a reset link or confirmation to the user's email
  };

  return (
    <div className="forgot-password-container">
      <form onSubmit={handleSubmit} className="forgot-password-form">
        <h2>Forgot Password</h2>
        <p>
          Enter the email associated with your account, and we'll send you a
          reset link.
        </p>
        <label>
          Email:
          <input
            type="email"
            value={email}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" >Reset Password</button>
      </form>
    </div>
  );
};
// onClick={()=>{navigate('/login')}}

export default ForgotPassword;
