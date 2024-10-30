import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import { CustomButton } from "./";
import { logo,  logout, profile } from "../assets";
import { navlinks } from "../constants";

const Navbar = () => {
  const navigate = useNavigate();
  const [isActive, setIsActive] = useState("dashboard");
  const [toggleDrawer, setToggleDrawer] = useState(false);

  return (
    <div className="flex flex-row px-6 justify-between items-center max-w-[1280px] mx-auto ">
      <div className="flex flex-row justify-center gap-4">
        <div className="w-[52px] h-[52px] rounded-full  flex justify-center items-center cursor-pointer">
          <img
            src={logo}
            alt="user"
            className="w-[60%] h-[60%] object-contain"
          />
          <h1 className="font-epilogue font-bold pl-4 text-[18px] text-[#3F3D56] text-left">Taskify</h1>
        </div>
      </div>
      <div className="flex flex-row justify-end gap-4">
        <div className="w-[52px] h-[52px] rounded-full bg-[#F5F7F9] flex justify-center items-center cursor-pointer">
          <img
            src={profile}
            alt="user"
            className="w-[90%] h-[90%] rounded-full object-contain"
          />
        </div>
        <div className="w-[42px] h-[42px] rounded-full bg-[#F5F7F9] flex justify-center items-center cursor-pointer">
          <img
            src={logout}
            alt="user"
            className="w-[60%] h-[60%] object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
