import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { add, loader } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import { TaskList } from "../components";
import { Link } from "react-router-dom";
import { FormField,Tabs, CustomButton, CustomDropdown } from "../components";
import {
  signIn,
  getUserTasks,
  getCurrentUser,
} from "../store/features/auth/authSlice";


const Home = () => {
  const [form, setForm] = useState({

    priority: "",
  });
  const navigate = useNavigate();

  const { tasks, isAuthenticated, isLoading, error, user } = useSelector(
    (state) => state.auth
  );


  const dispatch = useDispatch();
  

// Check for loading state and user information
useEffect(() => {
  if (isAuthenticated) {
    dispatch(getCurrentUser()).then(() => {
      dispatch(getUserTasks());
    });
  }else {
    // Redirect to sign-in page if the user is not authenticated
    navigate("/sign-in"); // Change this to your actual sign-in route
  }
}, [isAuthenticated, dispatch, navigate]);

const username = user?.name // Fallback if username is not available

  return (
    <div className="flex flex-col mt-8">
      <h1 className="font-epilogue font-bold text-[28px] text-[#3F3D56] text-left">
        Bem-vindo, <span className="text-[#1dc071]">{username}.</span>
      </h1>

      
      <div className="flex flex-row justify-between items-center ">
        <div className="py-4">
          <Link
            to="/create-task"
            className="lg:flex-1 flex flex-row max-w-[150px] px-4 justify-between items-center cursor-pointer items-center p-2 h-[52px] bg-[#1dc071]  rounded-[12px]"
          >
            <img
              src={add}
              alt="add"
              className="w-[20px]  h-[20px] object-contain"
            />

            <p className="font-epilogue pl-2 font-semibold text-[18px] leading-[30px] text-[#ffffff] sm:pl-2">
              Tarefa
            </p>
          </Link>
        </div>
        {/* <div className="flex flex-row justify-end items-center">
        <div className="pl-2">
            FIltro prioridade
          </div>
          <div className="pl-2">
             FIltro completed
          </div>
        </div> */}
      </div>

      <div className="mt-4">
        {/* <TaskList /> */}
        <Tabs />
      </div>
    </div>
  );
};

export default Home;
