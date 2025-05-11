"use client";

import axios from "axios";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { FieldValues, useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useMutation } from "@apollo/client";
import { LOGIN_USER, REGISTER_USER } from "../graphql/auth.graphql";
import { useAuth } from "../utils/useAuth";
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function SignUp() {
  const [show, setShow] = useState(false);
  const [errorPassword, setErrorPassword] = useState(false);
  const { login, register, logout, user, token, isAuthenticated } = useAuth();

  const {
    register: registerSignup,
    reset,
    getValues,
    handleSubmit,
    formState: { errors: errorsSignup },
  } = useForm();

  const onSubmit = (values: any) => {
    register(values);
  };

  const isSamePassword = (values: FieldValues) => {
    const { password, confirm } = values;
    if (password !== confirm) {
      setErrorPassword(true);
    } else {
      setErrorPassword(false);
    }
  };

  return (
    <div>
      <form
        onSubmit={handleSubmit((values) => {
          onSubmit(values);
        })}
      >
        <div className="flex flex-col">
          <label htmlFor="">Nom Prénom</label>
          <input
            type="text"
            {...registerSignup("username", { required: true })}
            //onChange={(e) => setEmail(e.target.value)}
            className="p-1 border rounded-md"
          />
          {errorsSignup.username && (
            <div className="text-xs text-red-500">Ce champ est requis</div>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Email</label>
          <input
            type="email"
            {...registerSignup("email", { required: true })}
            //onChange={(e) => setEmail(e.target.value)}
            className="p-1 border rounded-md"
          />
          {errorsSignup.email && (
            <div className="text-xs text-red-500">Ce champ est requis</div>
          )}
        </div>
        <div className="flex flex-col">
          <label htmlFor="">Mot de passe</label>
          <input
            type="password"
            {...registerSignup("password", { required: true })}
            //onChange={(e) => setPassword(e.target.value)}
            className="p-1 border rounded-md"
          />
          {errorsSignup.password && (
            <div className="text-xs text-red-500">Ce champ est requis</div>
          )}
        </div>
        <div className="mt-6">
          <label htmlFor="confirm">Confirmation mot de passe</label>
          <div className="relative">
            <input
              type={show ? "text" : "password"}
              {...registerSignup("confirm", { required: true })}
              onBlur={() => isSamePassword(getValues())}
              className="w-full border rounded-md"
            />
            <div
              onClick={() => setShow(!show)}
              className="absolute inset-y-0 right-1 flex items-center"
            >
              {show ? <FaEye /> : <FaEyeSlash />}
            </div>
          </div>
          {errorsSignup.confirm && (
            <div className="text-red-600">Ce champ est requis</div>
          )}
          {errorPassword && (
            <div className="text-red-600">
              Le mot de passe n'est pas identique
            </div>
          )}
        </div>
        <div className="mt-8">
          <button type="submit" className="px-2 py-1 bg-blue-500 rounded-md">
            VALIDER
          </button>
        </div>
      </form>
    </div>
  );
}
