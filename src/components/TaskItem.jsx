import React from "react";
import { check, edit, trash } from "../assets";

const TaskItem = ({ task, onUpdate, onDelete, onComplete }) => {
  const handleToggleCompleted = () => {
    if (!task.completed) {
      onComplete();
    }
  };

  return (
    <div
      className={`flex items-center bg-[#F5F7F9] mb-4 p-2 h-[72px] rounded-[20px] justify-between ${
        task.completed ? "line-through" : ""
      }`}
    >
      <div className="flex flex-row  items-center px-2">
        <div
          className={`w-[24px] h-[24px] cursor-pointer flex justify-center items-center rounded-md border-[#C6CFDC] border-[2px] ${
            task.completed ? "bg-[#1dc071] border-none" : ""
          }`}
          onClick={handleToggleCompleted}
        >
          {task.completed && (
            <img
              src={check}
              alt="user"
              className="w-3 h-3 rounded-lg object-contain"
            />
          )}
        </div>
        <span className="font-epilogue font-semibold text-[18px] pl-4 leading-[30px] text-[#818183]">
          {task.title} (Priority: {task.priority})
        </span>
      </div>
      <div className="flex flex-row justify-center items-center">
        <div
          className={`w-[24px] h-[24px] cursor-pointer flex justify-center items-center`}
        >
          <img
            src={edit}
            alt="user"
            className="w-5 h-5 rounded-lg object-contain"
          />
        </div>
        <div
          className={`w-[24px] h-[24px] cursor-pointer flex justify-center items-center 
           `}
          onClick={handleToggleCompleted}
        >
          <img
            src={trash}
            alt="user"
            className="w-4 h-4 rounded-lg object-contain"
          />
        </div>
      </div>
    </div>
  );
};

export default TaskItem;
