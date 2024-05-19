"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NavBar } from "../../components/NavBar";

export default function Home() {
  return (
    <div className="">
      <NavBar />
      <div>BIENVENUE</div>
    </div>
  );
}
