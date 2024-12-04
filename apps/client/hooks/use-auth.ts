"use client";

import axios from "axios";
import { useState } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

export const useAuth = (): UseAuthReturnTypes => {
  const router = useRouter();

  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const login = async (data: LoginData): Promise<LoginReturnType> => {
    setLoading(true);
    try {
      const response = await axios.post<LoginReturnType>(
        `${process.env.NEXT_PUBLIC_API_URL as String}/login`,
        data
      );

      const { token, message, success } = response.data;

      setMessage(message as string);

      if (success) {
        setSuccess(true);

        if (!token) {
          throw new Error("Token not found");
        }

        if (token) {
          localStorage.setItem("token", token as string);
          Cookies.set("token", token as string);
        }
      }

      return response.data;
    } catch (error: any) {
      setSuccess(false);
      return error;
    } finally {
      setLoading(false);
    }
  };

  const register = async (data: RegisterData): Promise<RegisterReturnType> => {
    setLoading(true);
    try {
      const response = await axios.post<RegisterReturnType>(
        `${process.env.NEXT_PUBLIC_API_URL as String}/register`,
        data
      );

      const { token, message, success } = response.data;

      setMessage(message as string);

      if (success) {
        setSuccess(true);

        if (!token) {
          throw new Error("Token not found");
        }

        if (token) {
          localStorage.setItem("token", token as string);
          Cookies.set("token", token as string);
        }
      }

      return response.data;
    } catch (error: any) {
      setSuccess(false);
      return error;
    } finally {
      setLoading(false);
    }
  };

  const verify = async (data: VerifyData): Promise<VerifyReturnType> => {
    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL as String}/verify`,
        { ...data, token: localStorage.getItem("token") as string }
      );

      return response.data;
    } catch (error: any) {
      return error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      localStorage.removeItem("token");
      Cookies.remove("token");

      router.push("/sign-in");
    } catch (error: any) {
      console.error(error);
    }
  };
  
  return {
    loading,
    success,
    message,
    login,
    register,
    verify,
    logout,
  };
};
