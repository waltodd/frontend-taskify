import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { signout } from '../store/features/auth/authSlice';
import { useDispatch, useSelector } from 'react-redux';
import { logo, logout, profile } from "../assets";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate()
  const {  user } = useSelector((state) => state.auth);

 const username = user?.name 
  const handleLogout = () => {
    dispatch(signout());
    // localStorage.removeItem('token')
    navigate('/sign-in');

  }
  return (
    <div className="flex flex-row px-6 justify-between items-center max-w-[1280px] mx-auto ">
      <div className="flex flex-row justify-center items-center gap-4">
        <Link to="/home" className="w-[52px] h-[52px] rounded-full  flex justify-center items-center cursor-pointer">
          <img
            src={logo}
            alt="user"
            className="w-[60%] h-[60%] rounded-lg object-contain"
          />
          <h1 className="font-epilogue font-bold pl-2 text-[18px] text-[#3F3D56] text-left">
            Taskify
          </h1>
        </Link>
      </div>
      <div className="flex flex-row justify-center items-center gap-4">
        <h1 className="font-epilogue font-semibold  text-[18px] text-[#3F3D56] text-left">
          {username}
        </h1>
        <div className="w-[45px] h-[45px] rounded-full bg-[#F5F7F9] flex justify-center items-center cursor-pointer">
          <img
            src={profile}
            alt="user"
            className="w-[60%] h-[60%] rounded-full object-contain"
          />
        </div>
        <div className="w-[42px] h-[42px] rounded-full flex justify-center items-center cursor-pointer"
        onClick={handleLogout}
        >
          <img
            src={logout}
            alt="user"
            className="w-[50%] h-[50%] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
