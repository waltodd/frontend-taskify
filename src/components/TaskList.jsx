// import React from 'react';
// import { useSelector, useDispatch } from 'react-redux';
// import { updateTask, deleteTask, markAsCompleted } from '../../slices/tasksSlice';
import TaskItem from './TaskItem';

const tasks = [
  {
    id: 1,
    title: "Finish Redux Toolkit setup",
    description: "Complete the initial setup for Redux Toolkit in the project.",
    priority: "high", // Can be "low", "medium", or "high"
    completed: false, // Status of the task
    createdAt: new Date().toISOString(), // Date of creation
    dueDate: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(), // Optional due date
  },
  {
    id: 2,
    title: "Implement User Authentication",
    description: "Build registration and login forms with Redux actions.",
    priority: "medium",
    completed: false,
    createdAt: new Date().toISOString(),
    dueDate: new Date(new Date().setDate(new Date().getDate() + 5)).toISOString(),
  },
  {
    id: 3,
    title: "Create Task Management Components",
    description: "Develop the components for adding, updating, and deleting tasks.",
    priority: "low",
    completed: true,
    createdAt: new Date().toISOString(),
    dueDate: new Date(new Date().setDate(new Date().getDate() + 7)).toISOString(),
  },
];


const TaskList = () => {
//   const tasks = useSelector((state) => state.tasks.tasks);
//   const dispatch = useDispatch();

  return (
    <div>
      {tasks.map((task) => (
        <TaskItem
          key={task.id}
          task={task}
        //   onUpdate={(updatedTask) => dispatch(updateTask(updatedTask))}
        //   onDelete={() => dispatch(deleteTask(task.id))}
        //   onComplete={() => dispatch(markAsCompleted(task.id))}
        />
      ))}
    </div>
  );
};

export default TaskList;
