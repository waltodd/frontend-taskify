import React from "react";
import { Route, Routes,Navigate } from "react-router-dom";

import { Navbar } from "./components";
import { Home, SignIn, SignUp } from "./pages";
import ProtectedRoute from "./pages/ProtectedRoute";

const App = () => {
  
  return (
    <div className="relative sm: p-4 bg-[#FFFFFF] min-h-screen flex flex-row">
      <div className="flex-1 max-sm:w-full max-w-[1280px] mx-auto sm:pr-5">
        

        <Routes>
          <Route path="/" element={<Navigate to="/home" replace />} />
          <Route path="/sign-in" element={<SignIn />} />
          <Route path="/sign-up" element={<SignUp />} />
          <Route
            path="/home"
            element={
              <ProtectedRoute>
                <Navbar />
                <Home />
              </ProtectedRoute>
            }
          />
        </Routes>
      </div>
    </div>
  );
};

export default App;
