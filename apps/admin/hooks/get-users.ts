import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { User, UserType } from "@prisma/client";
import {
  getAllUsers,
  updateUser,
  deleteUser,
  getUserById,
} from "@/actions/user";

export const getUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [currentUser, setCurrentUser] = useState<User>();
  const [isAdmin, setIsAdmin] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const { user, isLoaded: isUserLoaded } = useUser();

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      const fetchedUsers = await getAllUsers();

      if (user?.id && fetchedUsers) {
        setUsers(fetchedUsers);
      }
    } catch (err) {
      setIsError(true);
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setIsLoading(false);
    }
  };

  const getCurrentUser = async () => {
    try {
      if (user) {
        setIsLoading(true);
        const fetchedUser = await getUserById(user.id);

        console.log(fetchedUser);
        console.log(fetchedUser?.role === "ADMIN");
        if (user.id && fetchedUser) {
          setCurrentUser(fetchedUser);
        }

        console.log(currentUser);
      }
    } catch (err) {
      setIsError(true);
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setIsLoading(false);
    }
  };

  const updateUser = async (id: string, role: UserType) => {
    try {
      setIsLoading(true);
      await updateUser(id, role);
      fetchUsers();
    } catch (err) {
      setIsError(true);
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setIsLoading(false);
    }
  };

  const deleteUser = async (id: string) => {
    try {
      setIsLoading(true);
      await deleteUser(id);
      fetchUsers();
    } catch (err) {
      setIsError(true);
      setError(err instanceof Error ? err : new Error("Unknown error"));
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (currentUser) {
      console.log("Current user updated:", currentUser);
      console.log("Is admin:", isAdmin);
    }
  }, [currentUser, isAdmin]);

  useEffect(() => {
    if (isUserLoaded && user?.id) {
      getCurrentUser();
    }
  }, [isUserLoaded, user?.id]);

  return {
    currentUser,
    users,
    isAdmin,
    isLoading: isLoading || !isUserLoaded,
    isError,
    error,
    refetch: fetchUsers,
    updateUser,
    deleteUser,
  };
};

export { updateUser}
