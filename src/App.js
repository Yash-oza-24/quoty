/* eslint-disable no-unused-vars */
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from './Pages/Landing.jsx'
import Home from "./Pages/Home.jsx"
import Login from "./Pages/Login.jsx"
import Registration from "./Pages/Registration.jsx"
import ForgotPassword from "./Pages/Forgotpassword.jsx"

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
        {/* <Route path="/" element={<Landing />} /> */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/login/forgot-password" element={<ForgotPassword />} />  
        </Routes>
      </Router>
    </div>
  );
}
export default App;
