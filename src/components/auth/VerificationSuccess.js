import React from "react";
import { Link } from "react-router-dom";

const VerificationSuccess = () => {
  return (
    <div className=" popup-container flex items-center ">
      <div className="w-3/4 mx-auto">
        <h1 className="text-2xl" style={{color:'#E2136E'}}>Successfully</h1>
        <p className="text-xs text-gray-500">Your Account has been created</p>
        <Link to="/login">
          <button
            className="font-mono mt-8 w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform "
            style={{ backgroundColor: "#E2136E" }}
          >
            Login
          </button>
        </Link>
      </div>
    </div>
  );
};

export default VerificationSuccess;
