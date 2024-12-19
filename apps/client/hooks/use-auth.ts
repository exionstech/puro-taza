"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";
import {
  LoginData,
  LoginReturnType,
  RegisterData,
  RegisterReturnType,
  UseAuthReturnTypes,
  User,
  VerifyData,
  VerifyReturnType,
} from "@/types";

export const useAuth = (): UseAuthReturnTypes => {
  const router = useRouter();

  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const [user, setUser] = useState<User | null>(() => {
    // Initialize user from localStorage if available
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      return storedUser ? JSON.parse(storedUser) : null;
    }
    return null;
  });
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

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
      const response = await axios.post(`/api/auth/verify`, {
        ...data,
        token: localStorage.getItem("token") as string,
      });

      if (response.data.data.client) {
        const userData = response.data.data.client;
        setUser(userData);
        localStorage.setItem("user", JSON.stringify(userData));
        setIsLoggedIn(true);
      }

      const redirectUrl = new URLSearchParams(window.location.search).get(
        "redirectUrl"
      );

      router.push(redirectUrl || "/");

      return response.data.data;
    } catch (error: any) {
      setUser(null);
      localStorage.removeItem("user");
      setIsLoggedIn(false);
      return error;
    }
  };

  const logout = async (): Promise<void> => {
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      Cookies.remove("token");
      setUser(null);
      setIsLoggedIn(false);
    } catch (error: any) {
      console.error(error);
    }
  };

  useEffect(() => {
    const token = Cookies.get("token");
    setIsLoggedIn(!!token);

    // Load user from localStorage on mount
    if (typeof window !== "undefined") {
      const storedUser = localStorage.getItem("user");
      if (storedUser) {
        setUser(JSON.parse(storedUser));
      }
    }
  }, []);

  return {
    loading,
    success,
    message,
    isLoggedIn,
    user,
    login,
    register,
    verify,
    logout,
  };
};
