"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from 'next/image'
import { useRouter } from "next/navigation";

const Login = () => {
  const router = useRouter()

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  async function formHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    console.log("Formhandler executed")

    try {
      const response = await axios.post('/api/users/login', formData)
      console.log(response)
      router.push("/")
    } catch (err) {
      console.log("Error in axios post from login page")
    }
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-[25rem] border rounded border-slate-300 p-2">
          <h1 className="font-bold text-[1.7em] text-center text-slate-600">
            Log In
          </h1>

          <form
            onSubmit={(e) => formHandler(e)}
            className="flex flex-col gap-2"
          >

            <div className="flex flex-col">
              <label htmlFor="email" className="text-slate-500">
                Email
              </label>
              <input
                type="text"
                id="email"
                placeholder="Enter registered your email"
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                className="border rounded border-slate-200 p-2"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="text-slate-500">
                Password
              </label>
              <input
                type="password"
                id="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                className="border rounded border-slate-200 p-2"
              />
            </div>


            <div className="mx-auto">
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 w-fit p-2 min-w-[10rem] rounded text-white">
                Login
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
