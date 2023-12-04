import React, { useState } from "react";
import { login } from "../../api";
import { useNavigate } from "react-router-dom";
import { FaEyeSlash } from "react-icons/fa";
import { FaEye } from "react-icons/fa";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [passwordToggle, setPasswordToggle] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await login(username, password);
      const { token, id } = response.data;
      localStorage.setItem("token", token);
      localStorage.setItem("adminID", id);
      navigate("/dashboard");
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <div className="login-main-contianer flex items-center  mx-auto w-[800px]  h-auto p-16">
    <div className="flex flex-col gap-y-8 mx-auto w-full  h-fit p-16">
      <div className="login-wrapper  ">
        <div className="venue-admin-heading mb-8 text-[32px] w-full text-center font-bold  flex flex-col gap-y-4 mx-auto">
          Venue Admin Login
        </div>
        <form
          className="w-full mx-auto gap-y-8  flex flex-col justify-center"
          onSubmit={handleLogin}
        >
          <div className="username-wrapper w-full flex  items-center">
            <input
              type="text"
              placeholder="Username"
              value={username}
              className="border bg-transparent h-[40px] border-[#C2C2C2] rounded-md w-[600px] px-4"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="password-wrapper w-full flex items-cente ">
            <input
              type={passwordToggle ? "password" : "text"}
              placeholder="Password"
              value={password}
              className="border bg-transparent h-[40px] border-[#C2C2C2] border-r-0 rounded-md rounded-r-none w-[560px] px-4 focus:outline-none"
              onChange={(e) => setPassword(e.target.value)}
            />
            <button
              onClick={() => setPasswordToggle(!passwordToggle)}
              className="h-[40px] w-[40px] border rounded-md rounded-l-none cursor-pointer border-l-0 border-[#C2C2C2]"
            >
              {passwordToggle ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <button
            className={`w-full rounded-xl h-[50px] ${
              username && password ? "bg-[#6741D9]" : "bg-[#c2c2c2]"
            }`}
            
            type="submit"
          >
            Sign in
          </button>
          <a
            href="/"
            className="signup text-sm text-center w-full translate-y-[-25px]"
          >
            New Registeration?
          </a>
        </form>
      </div>
    </div>
    </div>
  );
};

export default Login;
