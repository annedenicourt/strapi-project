"use client";

import { usePathname } from "next/navigation";
import Link from "next/link";

interface NavBarProps {
  role?: string;
}

export const NavBar: React.FC<NavBarProps> = ({ role = null }) => {
  const pathname = usePathname();

  return (
    <nav className="w-full flex justify-end">
      <Link
        className={`mx-3 ${pathname === "/" ? "font-bold underline" : ""}`}
        href="/"
      >
        Accueil
      </Link>
      {/* <Link
        className={`mx-3 ${
          pathname === "/events" ? "font-bold underline" : ""
        }`}
        href="/events"
      >
        Events
      </Link> */}
      <Link
        className={`mx-3 ${
          pathname === "/plants" ? "font-bold underline" : ""
        }`}
        href="/plants"
      >
        Catalogue
      </Link>
      <Link
        className={`mx-3 ${
          pathname === "/favoris" ? "font-bold underline" : ""
        }`}
        href="/favoris"
      >
        Mes favoris
      </Link>
      {role === "administrator" && (
        <Link
          className={`mx-3 ${
            pathname === "/admin" ? "font-bold underline" : ""
          }`}
          href="/admin"
        >
          Espace admin
        </Link>
      )}
    </nav>
  );
};
