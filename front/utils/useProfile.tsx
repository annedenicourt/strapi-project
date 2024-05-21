import axios from "axios";
import { redirect } from "next/navigation";
import { useEffect, useState } from "react";

type User = {
  id: number;
  role: {
    type: string;
  };
};

export const useProfile = () => {
  const [user, setUser] = useState<User>();
  //const storage = localStorage.getItem("tokenStrapi") || "";
  //const [token, setToken] = useState<string>(storage);
  const [token, setToken] = useState("");

  useEffect(() => {
    const storage = localStorage.getItem("tokenStrapi") || "";
    console.log(storage);
    if (storage) {
      setToken(storage);
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
            }
          );
          //console.log(request.data);
          setUser(request.data);
        } catch (error) {
          console.log(error);
        }
      };
      getMe();
    } else {
      console.log("vous devez vous reconnecter");
      //redirect("/");
    }
  }, [token]);

  const role = user?.role.type || "";
  const isAdmin = role === "SUPER_ADMIN" || role === "administrator";

  return {
    user,
    role,
  };
};
