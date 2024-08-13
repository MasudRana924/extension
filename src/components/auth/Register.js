import React from "react";
import "react-phone-input-2/lib/style.css";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { useEffect } from "react";
import logo from "../../assets/logo.png";
import { IoMdArrowBack } from "react-icons/io";
import { createOTP } from "../../redux/reducers/auth/otpSlice";
import Lottie from "lottie-react";
import axios from "axios";
import preloaderAnimation from "../../json/Animation - 1715745618808.json";
const Register = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {isLoading, error, success } = useSelector(
    (state) => state.otp
);
  const [phone, setPhone] = useState("");
  const isValidPhone = phone.length === 11;
  const [pin, setPassword] = useState("");
  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };
  const handlePhoneChange = (e) => {
    // const value = e.target.value;
    // const lastChar = value[value.length - 1];
    // if (/^[0-9]$/.test(lastChar) || value === "") {
    //   setPhone(value);
    // }
  //   const inputValue = e.target.value;
  // if (inputValue === '' || /^[0-9]+$/.test(inputValue)) {
  //   setWalletNo(inputValue);
  // }
  const inputValue = e.target.value;
  setWalletNo(/^[0-9]+$/.test(inputValue) ? inputValue : '');
  };
  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   console.log(phone);
  //   const myForm = new FormData();
  //   myForm.set("phone", phone);
  //   myForm.set("password", pin);
  //   const phoneWithCountryCode = `88${phone}`;
  //           console.log("Dispatching createOTP with: ", { phoneNumber: phoneWithCountryCode, pin });
  //           dispatch(createOTP({ phoneNumber: phoneWithCountryCode,pin}));
  // };
  const [walletNo, setWalletNo] = useState('');
  const [loading, setLoading] = useState(false);
  const [successOTP, setSuccess] = useState(false);
  const [errorMessage, setError] = useState(null);
  const handleInputChange = (e) => {
    const inputValue = e.target.value;
  setWalletNo(inputValue.replace(/[^0-9]/g, ''));
  };
  const handleSubmit=(e)=>{
    e.preventDefault();
    axios
      .post("http://10.21.179.54:8000/api/send-otp", {
        wallet_no: walletNo,
      })
      .then((response) => {
        console.log(response.data);
        setLoading(false);
        setSuccess(true);
        localStorage.setItem('walletNo', walletNo);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }
  useEffect(() => {
    if (successOTP) {
        navigate('/verify/otp');
    }
    // if (success) {
    //     navigate('/verify/otp');
    // }
}, [success, navigate,successOTP]);
  return (
    <div className=" popup-container flex-col space-y-8 ">
      <div className="w-3/4 mx-auto pt-4">
        <Link to="/">
          <p className="flex text-gray-500 text-sm gap-2">
            <IoMdArrowBack className="text-xl" style={{color:'#E2136E'}}/>
          </p>
        </Link>
      </div>
      <div className=" ">
        <div className="w-3/4 mx-auto ">
          <img src={logo} alt="" className="h-10 w-10 " />
          <h2 className="mt-6 text-xl text-gray-900 text-start ">
            Enter your wallet number{" "}
          </h2>
          <h2 className="text-sm text-gray-900 text-start ">for Login </h2>
          <form onSubmit={handleSubmit}>
            <div className="w-full mt-6">
              <input
                className="block w-full h-12 px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border outline-none"
                type="text"
                placeholder="Phone"
                aria-label="Phone"
                value={walletNo}
                onChange={handleInputChange}
                required
                maxLength={11}
              />
              {/* <input
                className="block w-full h-12 px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border outline-none"
                type="text"
                placeholder="Pin"
                aria-label="Pin"
                onChange={handlePasswordChange}
                required
                maxLength={11}
              /> */}
            </div>
            <div>
            <button
                  className='font-mono mt-4 w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform '
                  style={{backgroundColor:'#E2136E'}}
                >
                  Register 
                </button>
            </div>
          </form>
        </div>
      </div>
      {isLoading && (
        <div className="search-popup-overlay">
          <div className="searchpopup bg-gray-200">
            <Lottie
              animationData={preloaderAnimation}
              className="h-20 w-32"
            ></Lottie>
          </div>
        </div>
      )}
    </div>
  );
};

export default Register;
