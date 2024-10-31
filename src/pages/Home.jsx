import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { add, loader } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import { TaskList } from "../components";
import { Link } from "react-router-dom";
import { FormField, CustomButton, CustomDropdown } from "../components";
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
  const username = user?.name;

  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCurrentUser());
      dispatch(getUserTasks()); 
    }
  }, [isAuthenticated,dispatch]);
  // Filter tasks that belong to the current user


  return (
    <div className="flex flex-col mt-8">
      <h1 className="font-epilogue font-bold text-[28px] text-[#3F3D56] text-left">
        Bem-vindo, <span className="text-[#1dc071]">{username}.</span>
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
          Tem{" "}
          <strong className="font-epilogue font-bold text-[16px] text-[#1dc071]">
            {tasks?.length || "0"}
          </strong>{" "}
          tarefas para fazer.
        </p>
      </div>
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
        <div className="flex flex-row justify-end items-center">
        <div className="pl-2">
            FIltro prioridade
          </div>
          <div className="pl-2">
             FIltro completed
          </div>
        </div>
      </div>

      <div className="mt-4">
        <TaskList />
      </div>
    </div>
  );
};

export default Home;
