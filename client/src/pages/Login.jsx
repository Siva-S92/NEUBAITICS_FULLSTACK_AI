import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { backend } from "../constant";
import axios from "axios";
import toast from "react-hot-toast";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const Login = async (e) => {
    e.preventDefault();
    let formData = { email, password };
    try {
      const res = await axios.post(`${backend}/api/user/login`, formData);
      if (res.data.success) {
        console.log(res.data.user);
        toast.success(res.data.message, { duration: 5000 });
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("username", res.data.user.username);
        navigate(localStorage.getItem("redirectUrl"));
        
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      }
    } catch (error) {
      console.log(error.message);
      if (error.response) {
        toast.error(error.response.data.message || "An error occurred.", {
          duration: 5000,
        });
      } else {
        toast.error("Network error or server down.", { duration: 5000 });
      }
    }
  };

  return (
    <>
      <div className="w-screen h-screen content-center px-5 -mt-20">
        <h1 onClick={() => navigate("/")} className="cursor-pointer text-center text-blue-500 font-bold underline underline-offset-4 mb-10">
          Home
        </h1>
        <form
          onSubmit={Login}
          className="w-full max-w-2xl mx-auto flex flex-col gap-4 "
        >
          <h1 className="text-center text-3xl font-bold">Please Login </h1>
          {/* Top-level fields */}
          <div className="w-full">
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="w-full border rounded-md py-2 px-3"
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="password"
            >
              Password:
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="w-full border rounded-md py-2 px-3"
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="bg-slate-400 py-1 rounded-md">
            Submit
          </button>
          <div className="text-center text-sm text text-red-500">
            please sign up if you don't have an account{" "}
            <span>
              <a
                onClick={() => navigate("/signup")}
                className="text-blue-500 underline underline-offset-4 font-bold cursor-pointer"
              >
                sign up
              </a>
            </span>
          </div>
        </form>
      </div>
    </>
  );
}

export default Login;
