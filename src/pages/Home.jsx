import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { plus,loader } from "../assets";

import  {TaskList}  from "../components";

const Home = ({ title, isLoading, campaigns }) => {
  const navigate = useNavigate();

  const handleNavigate = (campaign) => {
    navigate(`/campaign-details/${campaign.title}`, { state: campaign });
  };

  return (
    <div className="flex flex-col mt-8">
      <h1 className="font-epilogue font-bold text-[28px] text-black text-left">
        Bem-vindo, <span className="text-[#1dc071]">João.</span>
      </h1>

      <div className="flex flex-wrap mt-[20px] gap-[26px]">
        <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
          Tem 7 tarefas para fazer.
        </p>
      </div>
      <div className="py-4">
        <div className="lg:flex-1 flex flex-row max-w-[458px] justify-center items-center py-2 pl-2 pr-2 h-[52px] bg-[#F5F7F9] rounded-[100px]">
          <img
            src={plus}
            alt="add"
            className="w-[28px] h-[28px] object-contain"
          />

          <input
            type="text"
            placeholder="Adicionar uma nova tarefa..."
            className="flex w-full font-epilogue font-semibold pl-2 text-[18px] placeholder:text-[#8D9CB8] text-[3F3D56] bg-transparent outline-none"
          />
        </div>
      </div>
      <div className="mt-4">
        <TaskList />
      </div>
    </div>
  );
};

export default Home;
