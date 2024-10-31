import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormField, CustomButton, CustomDropdown } from "../components";
import { createTask } from "../store/features/task/taskSlice";


const CreateTask = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    priority: "",
  });
  const dispatch = useDispatch();

  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const username = user?.name;

  const handleCreateTask = (e) =>{
    e.preventDefault();
    dispatch(createTask({ title: form.title,priority: form.priority , description: form.description }));
    navigate("/home");
  }


  return (
    <div className="flex flex-col mt-8 w-full max-w-[800px] mx-auto ">
      <h1 className="font-epilogue my-4 pl-4 font-bold text-[28px] text-[#3F3D56] text-left">
        Criar Tarefa
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
              selectedValue={form.priority}
              onChange={(value) =>
                setForm((prev) => ({ ...prev, priority: value.value }))
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
           handleClick={handleCreateTask}
          />
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
