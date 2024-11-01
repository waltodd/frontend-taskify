import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserTasks, getCurrentUser } from "../store/features/auth/authSlice";
import TaskItem from "./TaskItem";
import { loader, noresults } from "../assets";
import { deleteTask } from "../store/features/task/taskSlice";

const TaskList = ({ showCompleted }) => {
  const dispatch = useDispatch();
  const { tasks, isAuthenticated, isLoading, error } = useSelector(
    (state) => state.auth
  );
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    if (isAuthenticated) {
      dispatch(getCurrentUser());
      dispatch(getUserTasks()).finally(() => setInitialLoading(false));
    }
  }, [isAuthenticated, dispatch]);

  const handleDelete = (id) => {
    dispatch(deleteTask(id));
  };

  const filteredTasks = tasks?.filter(task => task.completed === showCompleted);

  if (initialLoading) {
    return (
      <div className="w-full flex flex-col justify-center items-center max-w-[1280px] mx-auto">
        <img src={loader} alt="loader" className="w-[100px] h-[100px] object-contain" />
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
      {filteredTasks && filteredTasks.length > 0 ? (
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
          <img src={noresults} alt="no results" className="w-[100px] h-[100px] object-contain pb-4" />
          <p className="font-epilogue font-bold text-[18px] text-[#3F3D56] text-left pb-1">
            Nenhuma tarefa encontrada.
          </p>
        </div>
      )}
    </div>
  );
};

export default TaskList;
