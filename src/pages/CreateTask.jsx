import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { FormField, CustomButton, CustomDropdown } from "../components";
import { createTask } from "../store/features/task/taskSlice";
import { add, back, loader } from "../assets";
import { Link } from "react-router-dom";
const CreateTask = () => {
  const [showError, setShowError] = useState(false); // State to control the visibility of the error message

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
    if(!form.title || !form.description || !form.priority){
      setShowError(true); // Show error messages
      setTimeout(() => {
        setShowError(false); // Hide error messages after 3 seconds
      }, 3000);
    }else {
      const {value} = form.priority 
      console.log(value)
      e.preventDefault();
      dispatch(createTask({ title: form.title,priority: value , description: form.description }));
      navigate("/home");
    }
    
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

            <p className="font-epilogue pl-2  font-semibold text-[14px] leading-[30px] text-[#3F3D56]">
              Voltar
            </p>
          </Link>
        </div>
      <h1 className="font-epilogue my-4 pl-4 font-bold text-[28px] text-[#3F3D56] text-left">
        Criar Tarefa
      </h1>
      <div className=" p-6   mt-5 flex flex-col ">
        {showError && (
           <span className="text-white my-2 rounded-[12px] bg-[#fe5f55] p-4 w-96">Todos os campos obrigatórios</span>
        )}
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
           handleClick={handleCreateTask}
          />
          
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreateTask;
