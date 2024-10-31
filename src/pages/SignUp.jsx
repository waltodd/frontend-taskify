import React, { useState, useEffect } from "react";
import { FormField, CustomButton } from "../components";
import { useDispatch, useSelector } from "react-redux";
import { signUp, clearError } from "../store/features/auth/authSlice";
import { Link } from "react-router-dom";
import { logo, loader } from "../assets";
import { useNavigate } from 'react-router-dom';




const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
  });
  const { isLoading, error, user } = useSelector((state) => state.auth);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
    return () => {
      dispatch(clearError());
    };
  }, [isAuthenticated, navigate, dispatch]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(
      signUp({ name: form.name, email: form.email, password: form.password })
    );
    navigate("/home");
  };
  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value });
  };
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
      ) : (
        <div className="w-[400px] p-6 h-full  mt-5 flex flex-col bg-[#F5F7F9] rounded-2xl">
          <h1 className="text-[#3F3D56] text-[18px] text-center py-2 font-bold">
            Registrar
          </h1>

          <div className="flex flex-wrap gap-[10px]">
            <FormField
              labelName="Nome *"
              placeholder="Nome"
              inputType="text"
              value={form.name}
              handleChange={(e) => handleFormFieldChange("name", e)}
            />
            <FormField
              labelName="Email *"
              placeholder="abc@taskify.ao"
              inputType="text"
              value={form.email}
              handleChange={(e) => handleFormFieldChange("email", e)}
            />
            <FormField
              labelName="Password *"
              placeholder="Password"
              inputType="password"
              value={form.password}
              handleChange={(e) => handleFormFieldChange("password", e)}
            />
          </div>

          <CustomButton
            btnType="button"
            title="Entrar"
            styles="bg-[#1dc071] mt-4"
            handleClick={handleSubmit}
          />
          <p className="font-epilogue mt-1 font-semibold text-[14px] leading-[30px] text-[#818183]">
            Já tem uma conta?{" "}
            <Link to="/sign-in" className="text-[#1dc071]">
              Faça login aqui
            </Link>
          </p>
        </div>
      )}
    </main>
  );
};

export default SignUp;
