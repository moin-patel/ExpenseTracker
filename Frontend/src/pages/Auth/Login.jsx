

import React, { useState, useContext } from "react";
import AuthLayout from "../../components/layouts/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input1 from "../../components/layouts/inputs/Input1";
import { validateEmail } from "../../utils/helper";
import axiosInstance from "../../utils/axiosInstance";
import { API_PATHS } from "../../utils/apiPaths";
import { UserContext } from "../../context/UserContext";
import toast from "react-hot-toast";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);

  const { updateUser } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!validateEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters long.");
      return;
    }

    setError(null);

    try {
      const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
        email,
        password,
      });

      const { token, user } = response.data;
      console.log(token)
      if (token) {
        localStorage.setItem("token", token);
        updateUser(user);
        navigate("/dashboard");
        toast.success("login successfull");
      
      }
    } catch (err) {
      if (err.response?.data?.message) {
        setError(err.response.data.message);
      } else {
        setError("Something went wrong");
        toast.success("somthing went wrong , please try again later ");
      }
    }
  };

  return (
    <AuthLayout>
      <div className="lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center">
        <h3 className="text-xl font-semibold text-black">Welcome back</h3>
        <p className="text-xs text-slate-700 mt-5 mb-6">
          Please sign in to continue
        </p>

        <form onSubmit={handleLogin}>
          <Input1
            type="text"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="enter your email"
            label="Email Address"
          />

          <Input1
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="enter your password"
            label="Password"
          />

          {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

          <button
            type="submit"
            className="w-[77%] bg-purple-600 hover:bg-purple-700 text-white py-3 rounded-lg mt-6"
          >
            LOGIN
          </button>

          <p className="text-sm mt-4 text-center">
            Don't have an account?{" "}
            <Link to="/signup" className="text-purple-600 font-medium">
              SignUp
            </Link>
          </p>
        </form>
      </div>
    </AuthLayout>
  );
};

export default Login;
