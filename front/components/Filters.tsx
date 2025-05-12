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
          className={`w-32 mx-3 ${
            mode === "owner" && "bg-red-300"
          } text-center rounded cursor-pointer`}
          onClick={() => setMode && setMode("owner")}
        >
          Mes plantes
        </div>
          <div
          className={`w-32 mx-3 ${
            mode === "favorites" && "bg-red-300"
          } text-center rounded cursor-pointer`}
          onClick={() => setMode && setMode("favorites")}
        >
          Mes favoris
        </div> 
      </div>
    </div>
  );
}
