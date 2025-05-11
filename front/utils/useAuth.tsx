import { useMutation } from "@apollo/client";
import Cookies from "js-cookie";
import { useState } from "react";
import { LOGIN_USER } from "../graphql/auth.graphql";
import { REGISTER_USER } from "../graphql/auth.graphql";
import { useRouter } from "next/navigation";
import { toast } from "react-toastify";

type loginForm = {
  email: string;
  password: string;
};
type registerForm = {
  username: string;
  email: string;
  password: string;
  confirm: string;
};

export const useAuth = () => {
  const [token, setToken] = useState<string | null>(
    Cookies.get("tokenStrapi") || null
  );
  const [user, setUser] = useState<any>(null);
  const router = useRouter();

  const [loginMutation] = useMutation(LOGIN_USER, {
    onCompleted: (data) => {
      const jwt = data.login.jwt;
      const user = data.login.user;

      Cookies.set("tokenStrapi", jwt, { expires: 7 });
      //Cookies.set("tokenStrapi", jwt, { expires: 7, secure: true });
      setToken(jwt);
      setUser(user);
      toast.success("Connexion réussie !");
      router.push("/plants");
    },
    onError: (error) => {
      console.error("Login error:", error.message);
      toast.error(
        "Problème de connexion. Vérifiez votre email ou votre mot de passe"
      );
    },
  });

  const [registerMutation] = useMutation(REGISTER_USER, {
    onCompleted: (data) => {
      const jwt = data.register.jwt;
      const user = data.register.user;

      Cookies.set("tokenStrapi", jwt, { expires: 1 });

      setToken(jwt);
      setUser(user);
      toast.success("Création de compte réussie !");
      router.push("/plants");
    },
    onError: (error) => {
      console.error("Register error:", error.message);
      toast.error("Nous n'avons pas pu créer votre compte, veuillez réessayer");
    },
  });

  const login = async ({ email, password }: loginForm) => {
    await loginMutation({
      variables: {
        input: {
          identifier: email,
          password,
        },
      },
    });
  };

  const register = async ({ username, email, password }: registerForm) => {
    await registerMutation({
      variables: {
        input: {
          username,
          email,
          password,
        },
      },
    });
  };

  const logout = () => {
    Cookies.remove("tokenStrapi");
    setToken(null);
    setUser(null);
  };

  return {
    token,
    user,
    login,
    register,
    logout,
    isAuthenticated: !!token,
  };
};
