import React from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import logo from "../../assets/logo.png";
import { IoMdArrowBack } from "react-icons/io";
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { error, loggeduser, isLoading } = useSelector(
    (state) => state.userDetails
  );
  const user = loggeduser.user;
  const [phone, setPhone] = useState("");
  const isValidPhone = phone.length === 11;
  const [password, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handlePhoneChange = (e) => {
    const value = e.target.value;
    const lastChar = value[value.length - 1];
    if (/^[0-9]$/.test(lastChar) || value === "") {
      setPhone(value);
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(phone);
    // dispatch(createLogin({ phone, password }));
    navigate("/verify-otp");
  };
  useEffect(() => {
    if (user) {
      navigate("/main");
    }
  }, [navigate, user]);
  return (
    <div className=" popup-container flex flex-col space-y-12">
      <div className="w-3/4 mx-auto pt-8">
        <Link to="/">
          <p className="flex text-gray-500 text-sm gap-2">
            <IoMdArrowBack className="text-xl" style={{color:'#E2136E'}}/>
          </p>
        </Link>
      </div>
      <div className=" ">
        <div className="w-3/4 mx-auto ">
          <img src={logo} alt="" className="h-10 w-10  mt-2 " />
          <h2 className="mt-6 text-xl text-gray-900 text-start ">
            Enter your wallet number{" "}
          </h2>
          <h2 className="text-sm text-gray-900 text-start ">for Login </h2>
          <form onSubmit={handleSubmit}>
            <div className="w-full mt-6">
              <input
                className="block w-full h-12 px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border rounded-lg dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-pink-400 dark:focus:border-pink-300 focus:ring-opacity-40 focus:outline-none focus:ring focus:ring-pink-300"
                type="text"
                placeholder="Phone"
                aria-label="Phone"
                onChange={handlePhoneChange}
                required
                maxLength={11}
              />
            </div>
            <div>
              {isLoading ? (
                <button className="font-mono mt-4 w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform bg-pink-500 rounded-lg ">
                  Loading
                </button>
              ) : (
                <button
                  className='font-mono mt-4 w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-lg'
                  style={{backgroundColor:'#E2136E'}}
                >
                  Create
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
