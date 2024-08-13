import React, { useState } from "react";
import { useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { useDispatch,useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { verifyOTP } from "../../redux/reducers/auth/verifyOTPSlice";
import Lottie from "lottie-react";
import preloaderAnimation from "../../json/Animation - 1715745618808.json";
import axios from "axios";
const VerifyOtp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [otpString, setOtp] = useState(["", "", "", "","",""]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  // const phoneNumber = localStorage.getItem("phoneNumber");
  
  const pin = localStorage.getItem("pin");
  const { isLoading, success, errorMessage } = useSelector((state) => state.otpVerification);
  useEffect(() => {
    const savedEndTime = localStorage.getItem("otpEndTime");
    if (savedEndTime) {
      const endTime = new Date(savedEndTime);
      const currentTime = new Date();
      const diff = Math.ceil((endTime - currentTime) / 1000);
      if (diff > 0) {
        setTimer(diff);
        setCanResend(false);
      } else {
        setTimer(0);
        setCanResend(true);
      }
    }
  }, []);
  useEffect(() => {
    let interval;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
    } else {
      setCanResend(true);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleResend = () => {
    // Logic to resend the OTP
    // ...

    const newEndTime = new Date(new Date().getTime() + 60 * 1000);
    localStorage.setItem("otpEndTime", newEndTime);
    setTimer(60);
    setCanResend(false);
    // setError(""); // Reset error
  };

  const handleChange = (index, value) => {
    if (/^[0-9]$/.test(value) || value === "") {
      const newOtp = [...otpString];
      newOtp[index] = value;
      setOtp(newOtp);
      // Move to the next input if the current input is not empty and not the last input
      if (value && index < otpString.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };


  const [loading, setLoading] = useState(false);
  const [successOTP, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const walletNo = localStorage.getItem("walletNo");
  const handleSubmit = (e) => {
    e.preventDefault();
    const otp = otpString.join("");
    axios
    .post("http://10.21.179.54:8000/api/verifyOTP", {
      walletNo: walletNo,
      OTP:otp
    })
    .then((response) => {
      console.log(response.data);
      setLoading(false);
      setSuccess(true);
      localStorage.setItem('wallet_no', walletNo);
    })
    .catch((err) => {
      setError(err);
      setLoading(false);
    });
    // if (otpString) {
    //     dispatch(verifyOTP({ phoneNumber, otp, pin }));
    // }
};
useEffect(() => {
    // if (success) {
    //     navigate('/verify/success');
    // }
    if (successOTP) {
        navigate('/verify/success');
    }
    // if(errorMessage){
    //     message.error(errorMessage)
    // }
}, [success, navigate,errorMessage,successOTP]);

  return (
    <div className="popup-container">
      <div className="flex flex-col justify-center bg-gray-150">
        <div className="px-6 pt-4 pb-9 mx-auto w-full max-w-lg">
          <div className="mx-auto flex w-full max-w-md flex-col">
            <div className="text-start">
              <div>
                <Link to="/">
                  <p className="flex text-sm gap-2" style={{color:'#E2136E'}}>
                    <IoMdArrowBack className=" text-xl" />
                  </p>
                </Link>
              </div>
              <div className="pt-8">
                <p className="text-xl font-mono" style={{color:'#E2136E'}}>
                  Verification Code
                </p>
                <p className="text-xs pt-2 text-gray-500">
                  We have sent a code to <span style={{ color: '#E2136E' }}>{walletNo}</span>
                </p>
              </div>
            </div>

            <div>
              <form className="mt-12" onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    {otpString.map((digit, index) => (
                      <div key={index} className="w-16 h-16">
                        <input
                          className="w-12 h-12 flex flex-col items-center justify-center text-center  outline-none rounded-xl border border-gray-200 text-md bg-white focus:bg-gray-50 focus:ring-1 ring-pink-500"
                          type="text"
                          maxLength="1"
                          value={digit}
                          onChange={(e) => handleChange(index, e.target.value)}
                          id={`otp-input-${index}`}
                          style={{ color: digit ? "#E2136E" : "black" }}
                          placeholder="0"
                          required
                        />
                      </div>
                    ))}
                  </div>
                  <div className="flex flex-col ">
                    <div className="text-start  text-sm font-medium  text-gray-500">
                      {canResend ? (
                        <button
                          onClick={handleResend}
                          className="text-xs"
                          style={{color:'#E2136E'}}
                        >
                          Resend OTP
                        </button>
                      ) : (
                        <p className="text-pink-500 text-xs">Did not recieve your OTP {`0:${timer.toString().padStart(2, "0")}`}  </p>
                        
                      )}
                    </div>
                    <div>
                      <button className="font-mono mt-4 w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform " style={{backgroundColor:'#E2136E'}}>
                        Verify Account
                      </button>
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
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

export default VerifyOtp;
