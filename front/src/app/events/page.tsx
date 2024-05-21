"use client";

//import { NavBar } from "@/app/components/NavBar";
import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { NavBar } from "../../../components/NavBar";
import { useProfile } from "../../../utils/useProfile";
import { useQuery } from "@apollo/client";
import { GET_EVENTS } from "../../../graphql/auth.graphql";

type attributes = {
  name: string;
};
type article = {
  id: number;
  attributes: attributes;
};

export default function Events() {
  const [articles, setArticles] = useState<article[]>([]);
  const [error, setError] = useState<unknown>();
  //const storage = localStorage.getItem("tokenStrapi") || "";

  const { user, role } = useProfile();
  //const [token, setToken] = useState<string>(storage);

  //console.log(user);
  //console.log(role);

  const [token, setToken] = useState("");

  useEffect(() => {
    const storage = localStorage.getItem("tokenStrapi") || "";
    setToken(storage);
  }, []);

  const { data: getEventsData } = useQuery(GET_EVENTS);
  console.log(getEventsData?.data);

  useEffect(() => {
    if (token) {
      const getAllEvents = async () => {
        try {
          const request = await axios.get("http://localhost:1337/api/events", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          //console.log("request", request);

          setArticles(request.data.data);
        } catch (error) {
          setError(error);
          console.log(error);
        }
      };

      getAllEvents();
    }
  }, [token]);

  return (
    <div className="">
      <NavBar role={role} />
      <div>LISTE DES EVENTS</div>

      <ul>
        {articles?.length > 0 &&
          articles?.map((article) => {
            return (
              <li key={article.id}>
                <Link href={`/article/${article.id}`}>
                  {article.attributes.name}
                </Link>
              </li>
            );
          })}
      </ul>
    </div>
  );
}
