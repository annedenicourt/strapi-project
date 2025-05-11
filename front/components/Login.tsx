"use client";

import axios from "axios";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../utils/useAuth";
import { toast, ToastContainer } from "react-toastify";

export default function Login() {
  const [mode, setMode] = useState<string>("login");
  const { login, register, logout, user, token, isAuthenticated } = useAuth();

  const {
    register: registerLogin,
    reset,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin },
  } = useForm();
  const notify = () => toast("Wow so easy!");

  const onSubmit = (values: any) => {
    login(values);
  };

  return (
    <div>
      <form
        onSubmit={handleSubmitLogin((values) => {
          onSubmit(values);
        })}
      >
        <div className="flex flex-col">
          <label htmlFor="">Email</label>
          <input
            type="email"
            {...registerLogin("email", { required: true })}
            //onChange={(e) => setEmail(e.target.value)}
            className="p-1 border rounded-md"
          />
          {errorsLogin.email && (
            <div className="text-xs text-red-500">Ce champ est requis</div>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Mot de passe</label>
          <input
            type="password"
            {...registerLogin("password", { required: true })}
            //onChange={(e) => setPassword(e.target.value)}
            className="p-1 border rounded-md"
          />
          {errorsLogin.password && (
            <div className="text-xs text-red-500">Ce champ est requis</div>
          )}
        </div>
        <div className="mt-8">
          <button type="submit" className="px-2 py-1 bg-blue-500 rounded-md">
            VALIDER
          </button>
        </div>
        {/* <div>
          <button onClick={notify}>Notify!</button>
          <ToastContainer />
        </div> */}
      </form>
    </div>
  );
}
