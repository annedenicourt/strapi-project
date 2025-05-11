"use client";

import { useEffect, useState } from "react";
import Login from "../../components/Login";
import SignUp from "../../components/Signup";
import "react-toastify/dist/ReactToastify.css";
import Cookies from "js-cookie";
import { redirect } from "next/navigation";

export default function Home() {
  const [mode, setMode] = useState<string>("login");
  const accessToken = Cookies.get("tokenStrapi");

  useEffect(() => {
    if (accessToken) {
      redirect("/plants");
    }
  }, []);

  return (
    <div>
      <div className="mt-36 flex flex-col items-center">
        <div>BIENVENUE</div>
        {mode === "login" ? <Login /> : <SignUp />}
        <div className="cursor-pointer">
          {mode === "login" ? (
            <div onClick={() => setMode("signup")}>
              Pas de compte ? Je me crée un compte
            </div>
          ) : (
            <div onClick={() => setMode("login")}>
              Déjà un compte ? Je me connecte à mon compte
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
