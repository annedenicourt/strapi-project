import axios from "axios";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

type User = {
  id: number;
  role: {
    type: string;
  };
};

export const useProfile = () => {
  const [user, setUser] = useState<User>();
  const [token, setToken] = useState("");
  const accessToken = Cookies.get("tokenStrapi");

  useEffect(() => {
    if (accessToken) {
      setToken(accessToken);
    }
  }, []);

  useEffect(() => {
    if (token) {
      const getMe = async () => {
        try {
          const request = await axios.get(
            "http://localhost:1337/api/users/me?populate=role",
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
              //withCredentials: true,
            }
          );
          setUser(request.data);
        } catch (error) {
          console.log(error);
        }
      };
      getMe();
    }
  }, [token]);

  const role = user?.role.type || "";
  //const isAdmin = role === "SUPER_ADMIN" || role === "administrator";

  return {
    user,
    role,
  };
};
