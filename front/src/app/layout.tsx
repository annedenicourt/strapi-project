import type { Metadata } from "next";
import "./globals.css";
import { redirect } from "next/navigation";
import { useEffect } from "react";
import { ApolloClient, ApolloLink, HttpLink } from "@apollo/client";
import ApolloProvider from "./ApolloProvider";
import ModalSetup from "../../components/ModalSetup";
import { NavBar } from "../../components/NavBar";
import { ToastContainer } from "react-toastify";
import { quicksand } from "../../utils/fonts";

export const metadata: Metadata = {
  title: "Un monde de plantes",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr">
      <body className={`${quicksand} bg-kaki`}>
        <ToastContainer />
        <ModalSetup />
        <NavBar />
        <ApolloProvider>{children}</ApolloProvider>
      </body>
    </html>
  );
}
