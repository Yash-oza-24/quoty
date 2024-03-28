import React, { useState } from 'react';
import { Link } from 'react-router-dom'; 
import './Registration.css';

const Registration = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Registration data:', formData);
    signup(); 
  };
  const signup = async () => {

    if (!formData.username || !formData.email || !formData.password) {
      alert('Please fill in all fields');
      return;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert('Please enter a valid email address');
      return;
    }
    if (formData.password.length < 6) {
      alert('Password must be at least 6 characters long');
      return;
    }
    console.log("SignUp Function Executed", formData);
    let responseData;
    await fetch('http://localhost:5000/registration', {
      method: "POST",
      headers: {
        Accept: 'application/form-data',
        'content-type': 'application/json'
      },
      body: JSON.stringify(formData),
    })
    .then((response) => response.json())
    .then((data) => responseData = data);
    if (responseData.success) {
      localStorage.setItem('auth-token', responseData.token);
      localStorage.setItem('username', formData.username);
      window.location.replace('/login');
    } else {
      alert(responseData.errors);
  }
};

  return (
    <div className="registration-container">
      <form onSubmit={handleSubmit} className="registration-form">
        <label>
          Username:
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Email:
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Password:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </label>
        <button type="submit" className='btn btn-dark'>Register</button>
        <p>
          Already have an account? <Link to="/login">Login here</Link>.
        </p>
      </form>
    </div>
  );
};

export default Registration;
