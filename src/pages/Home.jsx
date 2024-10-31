import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { add, loader } from "../assets";
import { useDispatch, useSelector } from "react-redux";
import { TaskList } from "../components";
import { Link } from "react-router-dom";
import { FormField, CustomButton, TaskModal } from "../components";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const username = user?.name;

 


  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  return (
    <div className="flex flex-col mt-8">
      <h1 className="font-epilogue font-bold text-[28px] text-[#3F3D56] text-left">
        Bem-vindo, <span className="text-[#1dc071]">{username}.</span>
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
          Tem 7 tarefas para fazer.
        </p>
      </div>
      <div className="py-4">
        <Link to='/create-task'
          className="lg:flex-1 flex flex-row max-w-[150px] justify-between items-center cursor-pointer items-center p-2 h-[52px] bg-[#1dc071]  rounded-[12px]"
          
        >
          <img
            src={add}
            alt="add"
            className="w-[20px]  h-[20px] object-contain"
          />

          <p className="font-epilogue font-semibold text-[18px] leading-[30px] text-[#ffffff]">
            Criar tarefa
          </p>
        </Link>
      </div>
    
      <div className="mt-4">
        <TaskList />
      </div>
    </div>
  );
};

export default Home;
