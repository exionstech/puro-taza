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
    const clientId = Cookies.get("clientId");
    const token = Cookies.get("token");

    if (!clientId || !token) {
      setMessage("No client ID or token found");
      return null;
    }

    setLoading(true);
    try {
      const response = await axios.get<UserData>(
        `${process.env.NEXT_PUBLIC_API_URL}/client/${clientId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data);
      setSuccess(true);
      setMessage("User data fetched successfully");
      return response.data;
    } catch (error: any) {
      console.error("Fetch user error:", error);
      setSuccess(false);
      setMessage(error.response?.data?.message || "Failed to fetch user");
      return null;
    } finally {
      setLoading(false);
    }
  };

  const updateUser = async (data: UpdateUserData): Promise<UserData | null> => {
    const clientId = Cookies.get("clientId");
    const token = Cookies.get("token");

    if (!clientId || !token) {
      setMessage("No client ID or token found");
      return null;
    }

    setLoading(true);
    try {
      const response = await axios.put<UserData>(
        `${process.env.NEXT_PUBLIC_API_URL}/client/${clientId}`,
        data,
        {
          headers: {
            Authorization: `Bearer ${token}`,
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
    const clientId = Cookies.get("clientId");
    const token = Cookies.get("token");

    if (!clientId || !token) {
      setMessage("No client ID or token found");
      return false;
    }

    setLoading(true);
    try {
      await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/client/${clientId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setUser(null);
      setSuccess(true);
      setMessage("User deleted successfully");
      Cookies.remove("clientId");
      Cookies.remove("token");
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
    const token = Cookies.get("token");
    const clientId = Cookies.get("clientId");

    if (token && clientId) {
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