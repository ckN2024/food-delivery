"use client";
import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from 'next/image'
import { useRouter } from "next/navigation";

const Signup = () => {
  const router = useRouter()

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  async function formHandler(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // trim unneccesary spaces
    setFormData({ ...formData,
      firstName : formData.firstName.trim(),
      email : formData.email.trim(),
      password: formData.password.trim()
    })

    // stop if required fields are empty
    if(formData.firstName === "" || formData.email === "" || formData.password === "")
      throw new Error("firstname, email and pw cannot be empty strings")

    try {
      const response = await axios.post("/api/users/signup", formData);
      console.log(response);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
      router.push("/verifyemail")
    } catch (err) {
      console.log("Axios post error.");
      console.log(err);
    }
  }

  return (
    <>
      <div className="flex justify-center items-center min-h-screen">
        <div className="w-[25rem] border rounded border-slate-300 p-2">
          <h1 className="font-bold text-[1.7em] text-center text-slate-600">
            Sign Up
          </h1>

          <form
            onSubmit={(e) => formHandler(e)}
            className="flex flex-col gap-2"
          >
            <div className="flex flex-col">
              <label htmlFor="firstName" className="text-slate-500">
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                placeholder="Enter your first name"
                value={formData.firstName}
                onChange={(e) =>
                  setFormData({ ...formData, firstName: e.target.value })
                }
                className="border rounded border-slate-200 p-2"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="lastName" className="text-slate-500">
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                placeholder="Enter your last name"
                value={formData.lastName}
                onChange={(e) =>
                  setFormData({ ...formData, lastName: e.target.value })
                }
                className="border rounded border-slate-200 p-2"
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="text-slate-500">
                Email
              </label>
              <input
                type="text"
                id="email"
                placeholder="Enter your email"
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

            <div className="flex flex-col">
              <label htmlFor="confirmPassword" className="text-slate-500">
                Confirm Password
              </label>
              <input
                type="password"
                id="confirmPassword"
                placeholder="Confirm password"
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                className="border rounded border-slate-200 p-2"
              />
            </div>

            <div className="mx-auto">
              <button type="submit" className="bg-blue-600 hover:bg-blue-700 w-fit p-2 min-w-[10rem] rounded text-white">
                Sign Up
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default Signup;
