import React from "react";
import { check, edit, trash } from "../assets";

const TaskItem = ({ task, onUpdate, onDelete, onComplete }) => {
  const handleToggleCompleted = () => {
    if (!task.completed) {
      onComplete();
    }
  };

  const priorityColor = (priority) => {
    switch (priority) {
      case "alta":
        return "bg-[#fe5f55]"; // Red for high priority
      case "media":
        return "bg-[#edb54e]"; // Yellow for medium priority
      case "baixa":
        return "bg-[#4ca64c]"; // Green for low priority
      default:
        return ""; // Default color for undefined priority
    }
  };
  return (
    <div
      className={`flex items-start justify-start flex-col bg-[#F5F7F9] mb-4 p-2 h-full rounded-[20px] justify-between `}
    >
      <div className="flex flex-row w-full justify-between">
        <div className="flex flex-row  items-center px-2">
          <div
            className={`w-[24px] h-[24px] min-w-[24px] min-h-[24px] max-w-[24px] max-h-[24px] cursor-pointer flex justify-center items-center rounded-md border-[#C6CFDC] border-[2px] ${
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
          <span
            className={`font-epilogue ${
              task.completed ? "line-through" : ""
            } font-semibold text-[18px] pl-4 pr-2  leading-[30px] text-[#818183]`}
          >
            {task.title}
          </span>
          <span className={`text-[#FFFFFF] px-2 rounded-md font-epilogue ${priorityColor(task.priority)}`}>{task.priority}</span> 
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
      <div className="">
        <p className="font-epilogue   px-[50px] text-[#8D9CB8]">{task.description}</p>
      </div>
    </div>
  );
};

export default TaskItem;
