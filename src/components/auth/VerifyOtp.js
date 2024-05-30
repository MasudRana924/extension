import React, { useState } from "react";
import { useEffect } from "react";
import { IoMdArrowBack } from "react-icons/io";
import { Link, useNavigate } from "react-router-dom";

const VerifyOtp = () => {
  const navigate = useNavigate();
  const [otp, setOtp] = useState(["", "", "", "","",""]);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);

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
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);
      // Move to the next input if the current input is not empty and not the last input
      if (value && index < otp.length - 1) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const otpString = otp.join("");
    if(otpString){
      navigate('/')
    }
  };

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
                  We have sent a code to your phone number..
                </p>
              </div>
            </div>

            <div>
              <form className="mt-12" onSubmit={handleSubmit}>
                <div className="flex flex-col space-y-4">
                  <div className="flex flex-row items-center justify-between mx-auto w-full max-w-xs">
                    {otp.map((digit, index) => (
                      <div key={index} className="w-16 h-16">
                        <input
                          className="w-12 h-12 flex flex-col items-center justify-center text-center  outline-none rounded-xl border border-gray-200 text-md bg-white focus:bg-gray-50 focus:ring-1 ring-pink-500"
                          type="text"
                          maxLength="1"
                          value={digit}
                          onChange={(e) => handleChange(index, e.target.value)}
                          id={`otp-input-${index}`}
                          style={{ color: digit ? "#ed32b2" : "black" }}
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
                      <button className="font-mono mt-4 w-full px-6 py-3 text-sm font-medium tracking-wide text-white capitalize transition-colors duration-300 transform rounded-lg" style={{backgroundColor:'#E2136E'}}>
                        Verify Account
                      </button>
                    </div>

                    {/* <div className="flex flex-row items-center justify-center text-center text-sm font-medium space-x-1 text-gray-500">
                      <p>Didn't receive code?</p>
                      <a
                        className="flex flex-row items-center text-pink-500"
                        href="http://"
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Resend
                      </a>
                    </div> */}
                  </div>
                </div>
              </form>
              
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOtp;
