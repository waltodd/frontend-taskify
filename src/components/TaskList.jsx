import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserTasks, getCurrentUser } from "../store/features/auth/authSlice";
import TaskItem from "./TaskItem";
import { loader, noresults } from "../assets";
import { deleteTask,  } from "../store/features/task/taskSlice";

const TaskList = ({ showCompleted }) => {
  const options = [
    { label: "Todas", value: "all" },
    { label: "Baixa", value: "baixa" },
    { label: "Média", value: "media" },
    { label: "Alta", value: "alta" },
  ];
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const { tasks = [], isAuthenticated, isLoading, error } = useSelector(
    (state) => state.auth
  );
  const [initialLoading, setInitialLoading] = useState(true);
  const [selectedPriority, setSelectedPriority] = useState("all");
  const [selectedLabel, setSelectedLabel] = useState("Todas");

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCurrentUser());
      dispatch(getUserTasks()).finally(() => setInitialLoading(false));
    }
  }, [isAuthenticated, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const filteredTasks = tasks?.filter((task) => {
    const matchesCompletion = task.completed === showCompleted;
    const matchesPriority =
      selectedPriority === "all" || task.priority === selectedPriority;
    return matchesCompletion && matchesPriority;
  }) || []; // Fallback to empty array

  const handleOptionClick = (option) => {
    setSelectedPriority(option.value);
    setSelectedLabel(option.label);
    setIsOpen(false); // Close the dropdown
  };

  if (initialLoading) {
    return (
      <div className="w-full flex flex-col justify-center items-center max-w-[1280px] mx-auto">
        <img
          src={loader}
          alt="loader"
          className="w-[100px] h-[100px] object-contain"
        />
        <p className="font-epilogue font-bold text-[18px] text-[#3F3D56] text-left">
          Carregando...
        </p>
      </div>
    );
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="w-full flex flex-col items-center max-w-[1280px] mx-auto">
      <div className="w-full p-4 flex justify-between items-center">
        <div className="flex flex-wrap mt-[20px] gap-[26px]">
          <p className="font-epilogue font-semibold text-[14px] leading-[30px] text-[#818183]">
            {showCompleted ? (
              <>
                Tem{" "}
                <strong className="font-epilogue font-bold text-[16px] text-[#1dc071]">
                  {filteredTasks.length || 0}
                </strong>{" "}
                tarefas concluídas.
              </>
            ) : (
              <>
                Tem{" "}
                <strong className="font-epilogue font-bold text-[16px] text-[#1dc071]">
                  {filteredTasks.length || 0}
                </strong>{" "}
                tarefas para fazer.
              </>
            )}
          </p>
        </div>
        <div className="relative w-[270px]">
          <button
            className="w-full p-2 bg-[#FFFFFF] rounded-[12px] text-[18px] border-[#C6CFDC] border-[1px] text-left text-[#3F3D56]"
            onClick={() => setIsOpen((prev) => !prev)} // Toggle dropdown
          >
            Filtrar por prioridade :{" "}
            <span className="text-[14px] text-white rounded-[12px] py-2 px-4 bg-[#1dc071]">
              {selectedLabel}
            </span>
          </button>
          {isOpen && (
            <div className="absolute z-10 w-full mt-1 bg-[#FFFFFF] border-[#C6CFDC] border-[1px] rounded-[12px] shadow-lg">
              {options.map((option) => (
                <div
                  key={option.value}
                  className="p-2 text-[#3F3D56] hover:bg-[#1dc071] rounded-[12px] cursor-pointer"
                  onClick={() => handleOptionClick(option)} // Select option
                >
                  {option.label}
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Render tasks */}
      {filteredTasks.length > 0 ? (
        filteredTasks.map((task) => (
          <TaskItem
            key={task._id}
            task={task}
            onComplete={() => dispatch(markAsCompleted(task._id))}
            onDelete={handleDelete}
          />
        ))
      ) : (
        <div className="flex flex-col items-center">
          <img
            src={noresults}
            alt="no results"
            className="w-[100px] h-[100px] object-contain pb-4"
          />
          <p className="font-epilogue font-bold text-[18px] text-[#3F3D56] text-left pb-1">
            Nenhuma tarefa encontrada.
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskList;
