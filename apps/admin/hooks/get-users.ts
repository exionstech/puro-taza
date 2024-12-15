import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import { User, UserType } from "@prisma/client";
import { getAllUsers, updateUser, deleteUser } from "@/actions/user";

export const getUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
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
      setIsLoading(false);
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
    if (isUserLoaded) {
      fetchUsers();
    }
  }, [isUserLoaded, user?.id]);

  return {
    users,
    isLoading: isLoading || !isUserLoaded,
    isError,
    error,
    refetch: fetchUsers,
    updateUser,
    deleteUser,
  };
};
export { updateUser };

