import React from "react";
import "./Landing.css";
import { Link } from "react-router-dom";
import { FaArrowRightLong } from "react-icons/fa6";
const Landing = () => {
  return (
    <div>
      <div className="div">
        <div className="card ">
          <br />
          <div className="button">
            <Link to="/login">
              <button className="btn btn-dark">
                Get Started <FaArrowRightLong />
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Landing;
