import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { FormField, CustomButton, CustomDropdown } from "../components";
import { fetchTaskById, updateTask } from "../store/features/task/taskSlice";
import { back, loader, noresults } from "../assets";

import { Link } from "react-router-dom";


const EditTask = () => {
  const { id } = useParams(); // Get the task ID from the URL params
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Selector to get the task by ID from the state
  const task = useSelector((state) =>
    state.tasks.tasks.find((task) => task._id === id)
  );

  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "",
    // Add other fields as necessary
  });

  useEffect(() => {
    // Fetch the task when the component mounts
    const fetchTask = async () => {
      await dispatch(fetchTaskById(id));
    };
    fetchTask();
  }, [dispatch, id]);

  useEffect(() => {
    if (task) {
      setForm({
        title: task.title,
        description: task.description,
        priority: task.priority,
      });
    }
  }, [task]);

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };
  const handleUpdateTask = (e) => {
    const {value} = form.priority
    e.preventDefault();
    dispatch(
      updateTask({
        id,
        title: form.title,
        description: form.description,
        priority: value,
      })
    )
      .unwrap()
      .then(() => {
        navigate("/home"); // Redirect after updating
      })
      .catch((error) => {
        console.error("Falha ao atualizar a tarefa:", error);
      });
  };

  if (!task) {
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
    ); // or handle task not found
  }

  return (
    <div className="flex flex-col mt-8 w-full max-w-[800px] mx-auto ">
      <div className="py-4 ml-4">
          <Link
            to="/home"
            className="lg:flex-1 flex flex-row max-w-[90px] justify-between items-center cursor-pointer items-center p-2 h-[42px] bg-[#C6CFDC]  rounded-[12px]"
          >
            <img
              src={back}
              alt="add"y
              className="w-[24px]  h-[24px] object-contain"
            />

            <p className="font-epilogue pl-2 font-semibold text-[14px] leading-[30px] text-[#3F3D56]">
              Voltar
            </p>
          </Link>
        </div>
      <h1 className="font-epilogue my-4 pl-4 font-bold text-[28px] text-[#3F3D56] text-left">
        Editar Tarefa
      </h1>
      <div className=" p-6   mt-5 flex flex-col ">
        <div className="flex flex-col gap-[10px]">
          <div className="mb-2">
            <FormField
              labelName="Titulo *"
              placeholder="Titulo..."
              inputType="text"
              value={form.title}
              handleChange={(e) => handleFormFieldChange("title", e)}
            />
          </div>

          <div className="mb-2 w-[200px]">
            <CustomDropdown
              title="Selecione Prioridade"
              selectedValue={form.priority}
              onChange={(value) =>
                setForm((prev) => ({ ...prev, priority: value }))
              } // Update priority
            />
          </div>

          <div className="mb-2">
            <FormField
              labelName="Descrição *"
              placeholder="Descrição"
              inputType="text"
              isTextArea
              value={form.description}
              handleChange={(e) => handleFormFieldChange("description", e)}
            />
          </div>
          <div className="mb-2 w-full ">
            <CustomButton
              btnType="button"
              title="Guarda Tarefa"
              styles="bg-[#1dc071] mt-4"
              handleClick={handleUpdateTask}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditTask;
