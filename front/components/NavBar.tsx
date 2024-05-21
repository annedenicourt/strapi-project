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
          pathname === "/articles" ? "font-bold underline" : ""
        }`}
        href="/articles"
      >
        Articles
      </Link> */}
      <Link
        className={`mx-3 ${
          pathname === "/events" ? "font-bold underline" : ""
        }`}
        href="/events"
      >
        Events
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
