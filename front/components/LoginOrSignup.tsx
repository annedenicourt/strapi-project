"use client";

import axios from "axios";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NavBar } from "../components/NavBar";
import { useForm } from "react-hook-form";
import Cookies from "js-cookie";
import { useMutation } from "@apollo/client";
import { LOGIN_USER, REGISTER_USER } from "../graphql/auth.graphql";
import { useAuth } from "../utils/useAuth";

export default function LoginOrSignUp() {
  //const [token, setToken] = useState<string>("");
  const [mode, setMode] = useState<string>("login");
  const { login, register, logout, user, token, isAuthenticated } = useAuth();

  const {
    register: registerLogin,
    reset: resetLogin,
    handleSubmit: handleSubmitLogin,
    formState: { errors: errorsLogin },
  } = useForm();

  const {
    register: registerSignup,
    reset: resetSignup,
    handleSubmit: handleSubmitSignup,
    formState: { errors: errorsSignup },
  } = useForm();

  const [createUserMutation] = useMutation(REGISTER_USER, {
    onCompleted: (data) => {
      resetSignup();
      Cookies.set("tokenStrapi", data.register.jwt, {
        expires: 1, //expires in 1 day
        secure: true,
      });
    },
    onError: ({ message }) => {},
  });

  const [loginUserMutation] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      resetLogin();
      Cookies.set("tokenStrapi", data.login.jwt, {
        expires: 1,
        secure: true,
      });
      //setToken(data.login.jwt);
    },
    onError: (error) => {
      console.error("login error", error.message);
    },
  });

  /* const register = (values: registerForm) => {
    const { username, email, password } = values;
    const input = { username, email, password };

    createUserMutation({
      variables: {
        input,
      },
    });
  };
  const login = (values: loginForm) => {
    const { email, password } = values;
    const input = {
      identifier: email,
      password,
    };

    loginUserMutation({
      variables: {
        input,
      },
    });
  }; */

  const onSubmit = (values: any) => {
    if (mode === "login") {
      login(values);
    } else {
      register(values);
    }
  };

  return (
    <div className="mt-36 flex flex-col items-center">
      {mode === "login" ? (
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
              <button
                type="submit"
                className="px-2 py-1 bg-blue-500 rounded-md"
              >
                VALIDER
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div>
          <form
            onSubmit={handleSubmitSignup((values) => {
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
            <div className="mt-8">
              <button
                type="submit"
                className="px-2 py-1 bg-blue-500 rounded-md"
              >
                VALIDER
              </button>
            </div>
          </form>
        </div>
      )}
      <div className="cursor-pointer">
        {mode === "login" ? (
          <div onClick={() => setMode("signup")}>Je veux créer un compte</div>
        ) : (
          <div onClick={() => setMode("login")}>
            Je me connecte à mon compte
          </div>
        )}
      </div>
    </div>
  );
}
