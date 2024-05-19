"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

export const NavBar = () => {
  const pathname = usePathname();

  return (
    <nav>
      <Link
        className={`link ${pathname === "/" ? "font-bold underline" : ""}`}
        href="/"
      >
        Accueil
      </Link>

      <Link
        className={`link ${
          pathname === "/articles" ? "font-bold underline" : ""
        }`}
        href="/articles"
      >
        Articles
      </Link>
    </nav>
  );
};
