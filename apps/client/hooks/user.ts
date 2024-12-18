"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Cookies from "js-cookie";

interface UserData {
  id: string;
  name: string;
  email: string;
  phone: string;
}

interface UpdateUserData {
  name?: string;
  email?: string;
  phone?: string;
}

interface UserReturnType {
  loading: boolean;
  user: UserData | null;
  success: boolean;
  message: string;
  fetchUser: () => Promise<UserData | null>;
  updateUser: (data: UpdateUserData) => Promise<UserData | null>;
  deleteUser: () => Promise<boolean>;
}

export const useUser = (): UserReturnType => {
  const router = useRouter();

  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [success, setSuccess] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  const fetchUser = async (): Promise<UserData | null> => {
    setLoading(true);
    try {
      const response = await axios.get<UserData>(
        `${process.env.NEXT_PUBLIC_API_URL as string}/user`,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      setUser(response.data);
      setSuccess(true);
      setMessage("User data fetched successfully");
      return response.data;
    } catch (error: any) {
      setSuccess(false);
      setMessage(error.response?.data?.message || "Failed to fetch user");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (data: UpdateUserData): Promise<UserData | null> => {
    setLoading(true);
    try {
      const response = await axios.put<UserData>(
        `${process.env.NEXT_PUBLIC_API_URL as string}/user`,
        data,
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("token")}`,
          },
        }
      );

      setUser(response.data);
      setSuccess(true);
      setMessage("User updated successfully");
      return response.data;
    } catch (error: any) {
      setSuccess(false);
      setMessage(error.response?.data?.message || "Failed to update user");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const deleteUser = async (): Promise<boolean> => {
    setLoading(true);
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL as string}/user`, {
        headers: {
          Authorization: `Bearer ${Cookies.get("token")}`,
        },
      });

      setUser(null);
      setSuccess(true);
      setMessage("User deleted successfully");
      router.push("/login");
      return true;
    } catch (error: any) {
      setSuccess(false);
      setMessage(error.response?.data?.message || "Failed to delete user");
      return false;
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (Cookies.get("token")) {
      fetchUser();
    }
  }, []);

  return {
    loading,
    user,
    success,
    message,
    fetchUser,
    updateUser,
    deleteUser,
  };
};
