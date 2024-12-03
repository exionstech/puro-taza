"use client";

import axios from "axios";
import { useState } from "react";

export const useAuth = (): UseAuthReturnTypes => {
  const [success, setSuccess] = useState<boolean>(false);
  const [loading, setLoading] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const register = async (data: RegisterData): Promise<RegisterReturnType> => {
    const secret: string = process.env.NEXT_PUBLIC_JWTSECRET as string;
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

        if (!secret) {
          throw new Error("JWT Secret not found");
        }

        if (!token) {
          throw new Error("Token not found");
        }

        if (token) {
          localStorage.setItem("token", token as string);
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

  return {
    loading,
    success,
    message,
    register,
    verify,
  };
};
