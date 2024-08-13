import React from "react";
import "./Main.css";
import Navbar from "../shared/Navbar";
import {  Outlet, useLocation, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearMyTransaction } from "../../redux/reducers/transaction/transactionSlice";
const Main = () => {
  const dispatch=useDispatch()
  const location = useLocation();
  const navigate = useNavigate();

  const handleRecent=()=>{
    dispatch(clearMyTransaction());
    navigate("/main/recent");
  }
  return (
    <div className="popup-container ">
      <Navbar />
      <div className="w-full  flex justify-between">
        <button
          // onClick={() => navigate("/main/recent")}
          onClick={handleRecent}
          style={{ color: location.pathname === "/main/recent" || location.pathname === "/main" ? "#E2136E" : "gray"}}
          className="bg-gray-100 h-8 w-full"
        >
          Recent
        </button>
        <button
          onClick={() => navigate("/main/search")}
          style={{ color: location.pathname === "/main/search" ? "#E2136E" : "gray" }}
          className="bg-gray-100 h-8 w-full"
        >
          Search
        </button>
      </div>
      <Outlet />
    </div>
  );
};

export default Main;
