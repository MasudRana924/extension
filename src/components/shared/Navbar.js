import React from "react";
import "./Navbar.css";
import avatar from "../../assets/user.png";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Skeleton } from "@mui/material";
import { logout } from "../../redux/reducers/auth/loginSlice";
import { CiSettings } from "react-icons/ci";
import { PiSignOutLight } from "react-icons/pi";
const Navbar = () => {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.userDetails.loggeduser);
  return (
    <div className="main-navbar h-20">
      <div className="flex justify-between ">
        <div className="flex  w-full ">
          <div className="w-16">
            {user?.avatarLogo ? (
              <Link to="/profile">
                <img
                  src={user.avatarLogo}
                  alt=""
                  className="h-8 w-8 mt-2 absolute border rounded-full  "
                />
              </Link>
            ) : (
              <Link to="/profile">
                <img
                  src={avatar}
                  alt=""
                  className="h-10 w-10 ml-2 mt-2 absolute border rounded-full bg-pink-500 border-white"
                />
              </Link>
            )}
          </div>
          <div>
            {user ? (
              <p className="mt-2 text-white text-start text-xs font-medium">
                Merchant Wallet
              </p>
            ) : (
              <Skeleton
                variant="text"
                className=" mt-2"
                width={80}
                height={25}
              />
            )}
            {user?.phone ? (
              <p className=" text-white text-start text-xs font-medium">
                {user.phone}
              </p>
            ) : (
              <Skeleton
                variant="text"
                className=" mt-2"
                width={80}
                height={25}
              />
            )}
          </div>
        </div>
        <div className="w-1/4 flex items-center justify-end mr-4 gap-8">
        <Link to="/configure">
            <CiSettings className="text-white text-xl" />
          </Link>
          <button className=" w-full" onClick={() => dispatch(logout())}>
            <PiSignOutLight className="text-white text-xl " />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
