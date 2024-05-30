import React from "react";
import Lottie from "lottie-react";
import preloaderAnimation from "../json/Animation - 1715745618808.json";

const Preloader = () => {
  return (
    <div className=" popup-container flex justify-center items-center ">
      <div>
        <Lottie
          animationData={preloaderAnimation}
          className=" h-32 w-44"
        ></Lottie>
        {/* <p className="text-sm">CareerPulse</p> */}
      </div>
    </div>
  );
};

export default Preloader;