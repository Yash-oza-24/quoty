import React, { useState } from "react";
import "./Login.css";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Login data:", formData);
    login();
  };

  const login = async () => {
    if (!formData.email || !formData.password) {
      alert("Please fill in all fields");
      return;
    }
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      alert("Please enter a valid email address");
      return;
    }
    console.log("Login Function Executed", formData);
    let responseData;
    
    await fetch("http://localhost:5000/login", {
      method: "POST",
      headers: {
        Accept: "application/form-data",
        "content-type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => (responseData = data));
    if (responseData.success) {
      localStorage.setItem("auth-token", responseData.token);
      localStorage.setItem("username", formData.username);
      window.location.replace("/home");
    } else {
      alert(responseData.errors);
    }
  };
  return (
    <div className="login-container">
      <form onSubmit={handleSubmit} className="login-form">
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
        <button type="submit" className="btn btn-secondary">
          Login
        </button>
        <p
          onClick={() => {
            navigate("/login/forgot-password");
          }}
        >
          Forgot your password?
        </p>
        <p>
          Don't have an account? <Link to="/registration">Register here</Link>.
        </p>
      </form>
    </div>
  );
};

export default Login;
