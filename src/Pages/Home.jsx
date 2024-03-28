/* eslint-disable react-hooks/exhaustive-deps */
import React from "react";
import { useEffect, useState } from "react";
import "./Home.css";
import { Link } from 'react-router-dom'; 

const Home = (userid) => {
  const [url, setUrl] = useState(null);
  const [searchquery, setSearchquery] = useState("");
  const [quotes, setQuotes] = useState([]);
  const [error, setError] = useState("");
  const handleLogout = () => {
    localStorage.removeItem('auth-token');
    localStorage.removeItem('username'); 
    window.location.replace('/login');
  };

  const fetchdata = async () => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setQuotes(data.results || []);
      setError("");
    } catch (err) {
      console.error(err);
      setQuotes([]);
      setError("Please Try Again");
    }
  };

  const handlesubmit = (e) => {
    e.preventDefault();
    if (!searchquery) {
      setError("Please Enter a Keyword.");
      return;
    }
    setUrl(`https://api.quotable.io/search/quotes?query=${searchquery}`);
  };

  useEffect(() => {
    if (url) {
      fetchdata();
    }
  }, [url]);

  const handlechange = (e) => {
    setSearchquery(e.target.value);
    setError("");
  };
  return (
    <div className="">
      <nav className="navbar bg-dark">
        <div className="container-fluid text-white">
          <a class="navbar-brand " href="/">
            <span class="text-info rounded-circle border border-info p-1">
              YO
            </span>
          </a>
          <div className="nav-login">
             {localStorage.getItem("auth-token") ? (
          <>
            <p>Hii, {localStorage.getItem("username")}</p>
            <button onClick={handleLogout} className="btn btn-white bg-secondary fw-bold">LogOut</button>
          </>
        ) : (
          <Link style={{ textDecoration: "none" }} to="/login">
            <button className="btn btn-white bg-secondary fw-bold">Login</button>
          </Link>
        )}
          
        </div>
       
        </div>
      </nav>
      <div>
        <h1>Quote Generator</h1>
        <h5>Get Best Quotes Here</h5>
      </div>
      <div className="body">
        <form action="" onSubmit={handlesubmit}>
          <input
            type="text"
            className="input fw-bold"
            value={searchquery}
            onChange={handlechange}
            placeholder="Enter Your Key-Word eg: Money"
          />
          <button
            type="submit"
            className="btn btn-white bg-secondary fw-bolder mb-1 btn-outline-none "
          >
            Generate
          </button>
        </form>
        <div className="error">
          {error && <p style={{ color: "red" }}>{error}</p>}
        </div>
        <div className="">
          {quotes.map((quote, index) => (
            <div className="quote m-1 p-2 text-white">
              <p key={index}>
                {quote.content}{" "}
                <span className="text-info fw-bold">- {quote.author}</span>
                
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
