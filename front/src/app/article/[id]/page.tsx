"use client";

import axios from "axios";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";

type attributes = {
  title: string;
  content: string;
};
type article = {
  id: number;
  attributes: attributes;
};

export default function Home() {
  const { id } = useParams();
  const [article, setArticle] = useState<article>();
  const [error, setError] = useState<unknown>();

  useEffect(() => {
    const getArticle = async () => {
      try {
        const request = await axios.get(
          `http://localhost:1337/api/articles/${id}` /* {
          headers: {
            Authorization: `Bearer 2c32bc26bfabaf4caf437a41534d8017ab5e2996faae860bd870ad9c9e878d7f7585a4cb918dbee56790617f378ec763dcc9486e3b0351f8c47191a62a6a891f64726106233311ce38417743185c44a2785480cc8d3f46c8e421e5a21459b3c317dcaf6659cc3e58a310582b88009e2d71924a02b16d07f5aec8ff9265756213`,
          },
        } */
        );
        setArticle(request.data.data);
      } catch (error) {
        setError(error);
      }
    };

    getArticle();
  }, []);
  return (
    <div className="">
      <div>DETAILS</div>
      <ul>
        {article && (
          <div>
            <div>{article.attributes.title}</div>
            <div> {article.attributes.content}</div>
          </div>
        )}
      </ul>
    </div>
  );
}
