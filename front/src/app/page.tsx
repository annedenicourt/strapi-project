"use client";

import axios from "axios";
import { redirect } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NavBar } from "../../components/NavBar";
import { useForm } from "react-hook-form";

type loginForm = {
  email: string;
  password: string;
};

export default function Home() {
  const storage = localStorage.getItem("tokenStrapi") || "";
  //const [email, setEmail] = useState<string>("");
  const [token, setToken] = useState<string>(storage);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const login = async (values: loginForm) => {
    try {
      const request = await axios.post("http://localhost:1337/api/auth/local", {
        identifier: values.email,
        password: values.password,
      });
      //console.log("User profile", request.data.user);
      console.log("User token", request.data.jwt);
      if (request.data.jwt) {
        localStorage.setItem("tokenStrapi", request.data.jwt);
        setToken(request.data.jwt);
      }
    } catch (error) {
      console.log("An error occurred:", error);
    }
  };

  const onSubmit = (values: any) => {
    //console.log(values);
    login(values);
  };

  /*  useEffect(() => {
    const login = async () => {
      try {
        const request = await axios.post(
          "http://localhost:1337/api/auth/local",
          {
            identifier: "annedenicourt+adminstrapi@gmail.com",
            password: "Nanoute59!",
          }
        );
        //console.log("User profile", request.data.user);
        //console.log("User token", request.data.jwt);
        if (request.data.jwt) {
          localStorage.setItem("tokenStrapi", request.data.jwt);
          redirect("/events");
        }
      } catch (error) {
        console.log("An error occurred:", error);
      }
    };
    login();
  }, []); */

  useEffect(() => {
    if (token) {
      redirect("/events");
    }
  }, [token]);

  return (
    <div className="">
      <NavBar />
      <div>BIENVENUE</div>
      <div>
        <form
          onSubmit={handleSubmit((values) => {
            onSubmit(values);
          })}
        >
          <div className="flex flex-col">
            <label htmlFor="">Email</label>
            <input
              type="email"
              {...register("email", { required: true })}
              //onChange={(e) => setEmail(e.target.value)}
              className="p-1 border rounded-md"
            />
            {errors.email && (
              <div className="text-xs text-red-500">Ce champ est requis</div>
            )}
          </div>
          <div className="flex flex-col">
            <label htmlFor="">Mot de passe</label>
            <input
              type="password"
              {...register("password", { required: true })}
              //onChange={(e) => setPassword(e.target.value)}
              className="p-1 border rounded-md"
            />
            {errors.password && (
              <div className="text-xs text-red-500">Ce champ est requis</div>
            )}
          </div>
          <div className="mt-8">
            <button type="submit" className="px-2 py-1 bg-blue-500 rounded-md">
              Je me connecte
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
