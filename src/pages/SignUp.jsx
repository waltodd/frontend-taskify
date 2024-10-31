import React,{useState} from "react";
import { FormField, CustomButton } from "../components";
import icons from "../constants/icons";
import { Link } from "react-router-dom";
import { logo,loader } from "../assets";
const SignUp = () => {
  const [isLoading, setIsLoading] = useState(false);
  const submit = () => {};
  return (
    <main className="bg-[#FFFFFF] flex min-h-screen flex-col items-center justify-center ">
      <div className="flex flex-row justify-center items-center">
        <img
          src={logo}
          alt="user"
          className="w-7 h-7 rounded-lg object-contain"
        />
        <h1 className="text-[#3F3D56] pl-2 text-[24px] font-bold">Taskify</h1>
      </div>
      {isLoading ? (
        <img
          src={loader}
          alt="loader"
          className="w-[100px] h-[100px] object-contain"
        />
      ) :(
        <div className="w-[400px] p-6 h-full  mt-5 flex flex-col bg-[#F5F7F9] rounded-2xl">
        <h1 className="text-[#3F3D56] text-[18px] text-center py-2 font-bold">
          Registrar
        </h1>

        <div className="flex flex-wrap gap-[10px]">
          <FormField
            labelName="Nome *"
            placeholder="Nome"
            inputType="text"
          />
          <FormField
            labelName="Email *"
            placeholder="abc@taskify.ao"
            inputType="text"
          />
          <FormField
            labelName="Password *"
            placeholder="Password"
            inputType="password"
          />
        </div>

        <CustomButton
          btnType="button"
          title="Entrar"
          styles="bg-[#1dc071] mt-4"
        />
        <p className="font-epilogue mt-1 font-semibold text-[14px] leading-[30px] text-[#818183]">
        Já tem uma conta?{' '} <Link to="/sign-in" className="text-[#1dc071]">Faça login aqui</Link>
        </p>
      </div>
      )}
      
    </main>
  );
};

export default SignUp;
