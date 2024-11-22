import { useState, useEffect } from "react";
import { getStores } from "@/actions/store";
import { Store } from "@prisma/client";

export const useStores = () => {
  const [stores, setStores] = useState<Store[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchStores = async () => {
    try {
      setIsLoading(true);
      const fetchedStores = await getStores();
      setStores(fetchedStores);
      setIsLoading(false);
    } catch (err) {
      setIsError(true);
      setError(err instanceof Error ? err : new Error("Unknown error"));
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchStores();
  }, []);

  return {
    stores,
    isLoading,
    isError,
    error,
    refetch: fetchStores,
  };
};
