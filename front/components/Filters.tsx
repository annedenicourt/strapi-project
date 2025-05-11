"use client";

import Link from "next/link";
import { useState } from "react";

interface FiltersProps {
  mode: string;
  setMode: (mode: string) => void;
}

export default function Filters({ setMode, mode }: FiltersProps) {
  return (
    <div className="">
      <div className="flex flex-row items-center justify-center">
        <div
          className={`w-48 mx-3 ${
            mode === "" && "bg-red-300"
          } text-center rounded cursor-pointer`}
          onClick={() => setMode && setMode("")}
        >
          Toutes les plantes
        </div>
        <div
          className={`w-56 mx-3 ${
            mode === "public" && "bg-red-300"
          } text-center rounded cursor-pointer`}
          onClick={() => setMode && setMode("public")}
        >
          {" "}
          Plantes de la communauté
        </div>
        <div
          className={`w-32 mx-3 ${
            mode === "private" && "bg-red-300"
          } text-center rounded cursor-pointer`}
          onClick={() => setMode && setMode("private")}
        >
          Mes plantes
        </div>
      </div>
    </div>
  );
}
