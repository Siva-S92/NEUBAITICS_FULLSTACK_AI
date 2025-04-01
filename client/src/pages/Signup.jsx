import axios from "axios";
import React, { useState } from "react";
import { backend } from "../constant.js";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const SignUp = async (e) => {
    e.preventDefault();
    try {
      let formData = { username, email, password };
      const res = await axios.post(`${backend}/api/user/register`, formData);
      if (res.data.success) {
        toast.success(res.data.message, { duration: 5000 });
        navigate("/login");
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message, { duration: 5000 });
    }
  };

  return (
    <>
      <div className="w-screen h-screen content-center px-5 -mt-0 lg:-mt-20">
        <h1 onClick={() => navigate("/")} className="cursor-pointer text-center text-blue-500 font-bold underline underline-offset-4 my-10">
          Home
        </h1>
        <form
          onSubmit={SignUp}
          className="w-full max-w-2xl mx-auto flex flex-col gap-4 "
        >
          <h1 className="text-center text-3xl font-bold">Please Register </h1>
          {/* Top-level fields */}
          <div className="w-full">
            <label
              className="block text-sm font-medium mb-1"
              htmlFor="username"
            >
              Username:
            </label>
            <input
              type="text"
              id="username"
              name="username"
              className="w-full border rounded-md py-2 px-3"
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="w-full">
            <label className="block text-sm font-medium mb-1" htmlFor="email">
              Email:
            </label>
            <input
              type="text"
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
        </form>
      </div>
    </>
  );
}

export default Signup;
