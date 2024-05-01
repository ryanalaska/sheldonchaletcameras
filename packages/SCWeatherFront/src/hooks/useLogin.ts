import { useState } from "react";
import credentials from "../json/credentials.json";
import { LoginCredential } from "../types/credential";
import useAuth from "./useAuth";
import Storage from "../utils/storage";

export default function useLogin() {
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const { login: loginAction } = useAuth();
  const login = async ({ username, password }: LoginCredential) => {
    setLoading(true);
    setError(null);
    try {
      const user = credentials.find((user) => {
        return (
          (user.username.toLowerCase() === username.toLowerCase() || user.email.toLowerCase() === username.toLowerCase()) &&
          user.password === password &&
          user.status === 1
        );
      });

      if (!user)
        return setError("Username or password is incorrect, please try again");

      Storage.setValue("AUTH", user);
      loginAction(user);
    } catch (error) {
      console.error({ error });
      setError("Unexpected error, please try again");
    } finally {
      setLoading(false);
    }
  };

  return { error, loading, login };
}
