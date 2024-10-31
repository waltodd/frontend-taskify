import React, { useState, useEffect } from 'react';
import { FormField, CustomButton } from "../components";

import { Link } from "react-router-dom";
import { logo, loader } from "../assets";


import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signIn, clearError } from '../store/features/auth/authSlice';


const SignIn = () => {
  const [form, setForm] = useState({
    email: '',
    password: '',
    
  });

  
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { isLoading, error, user } = useSelector((state) => state.auth);
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/home');
    }
    return () => {
      dispatch(clearError());
    };
  }, [user, navigate, dispatch]);

  

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signIn({ email:form.email, password:form.password }));
    navigate('/home');
    alert()
  };
  const handleFormFieldChange = (fieldName, e) => {
    setForm({ ...form, [fieldName]: e.target.value })
  }
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
        <div className="w-[400px] p-6   mt-5 flex flex-col bg-[#F5F7F9] rounded-2xl">
          <h1 className="text-[#3F3D56] text-[18px] text-center py-2 font-bold">
            Login
          </h1>

          <div className="flex flex-wrap gap-[10px]">
            <FormField
              labelName="Email *"
              placeholder="abc@taskify.ao"
              inputType="text"
              value={form.email}
            handleChange={(e) => handleFormFieldChange('email', e)}
            />
            <FormField
              labelName="Password *"
              placeholder="Password"
              inputType="password"
              value={form.password}
            handleChange={(e) => handleFormFieldChange('password', e)}
            />
          </div>
          {error && <div className="text-red-500 text-sm mt-2">{error}</div>}


          <CustomButton
            btnType="button"
            title="Entrar"
            styles="bg-[#1dc071] mt-4"
            handleClick={handleSubmit}
          />
          <p className="font-epilogue mt-1 font-semibold text-[14px] leading-[30px] text-[#818183]">
            Não tem uma conta?{" "}
            <Link to="/sign-up" className="text-[#1dc071]">
              Registre-se aqui
            </Link>
          </p>
        </div>
      )}
    </main>
  );
};

export default SignIn;
