import React, { useEffect } from "react";
import {
  signIn,
  getUserTasks,
  getCurrentUser,
} from "../store/features/auth/authSlice";
import { useDispatch, useSelector } from "react-redux";
import TaskItem from "./TaskItem";
import { add, loader, noresults } from "../assets";
import { Link } from "react-router-dom";

const TaskList = () => {
  //   const tasks = useSelector((state) => state.tasks.tasks);
  //   const dispatch = useDispatch();

  const { user, tasks, isAuthenticated, isLoading, error } = useSelector(
    (state) => state.auth
  );

  const dispatch = useDispatch();
  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCurrentUser());
      dispatch(getUserTasks()); // Fetch tasks after the user is authenticated
    }
  }, [isAuthenticated, dispatch]);
  // Filter tasks that belong to the current user

  if (isLoading)
    return (
      <div className="w-full flex flex-col justify-center items-center max-w-[1280px] mx-auto">
        <img
          src={loader}
          alt="loader"
          className="w-[100px] h-[100px] object-contain"
        />
        <p className="font-epilogue font-bold text-[18px] text-[#3F3D56] text-left">
          Carrengando
        </p>
        ;
      </div>
    );
  if (error) {
    return <p>Error: {error}</p>;
  }

  // Safeguard against undefined tasks
  if (!Array.isArray(tasks) || tasks.length === 0) {
    return (
      <div className="w-full flex flex-col justify-center items-center max-w-[1280px] mx-auto">
        <img
          src={noresults}
          alt="loader"
          className="w-[100px] h-[100px] object-contain pb-4"
        />
        <p className="font-epilogue font-bold text-[18px] text-[#3F3D56] text-left pb-1">
          Nenhuma tarefa encontrada.
        </p>
        ;
      </div>
    );
  }
  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task._id} // Use task._id as key
          task={task}
          onComplete={() => dispatch(markAsCompleted(task.id))}
        />
      ))}
    </div>
  );
};

export default TaskList;
