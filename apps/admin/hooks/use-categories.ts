"use client";

import { Category, Image } from "@prisma/client";
import { useState, useEffect } from "react";

interface CategoryWithImages extends Category {
  image: Image[];
}

interface CategoryResponse {
  categories: CategoryWithImages[];
}

interface UseCategories {
  categories: CategoryWithImages[];
  isLoading: boolean;
  error: Error | null;
  refetch: () => Promise<void>;
  createCategory: (data: {
    name: string;
    image: { url: string; key: string };
  }) => Promise<void>;
  updateCategory: (
    categoryId: string,
    data: CategoryUpdateData
  ) => Promise<void>;
  isUpdating: boolean;
}

interface CategoryUpdateData {
  name?: string;
  image?: {
    url: string;
    key: string;
  };
}

export const useCategories = (storeId: string): UseCategories => {
  const [categories, setCategories] = useState<CategoryWithImages[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`/api/${storeId}/categories`);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: CategoryResponse = await response.json();
      setCategories(data.categories);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to fetch categories")
      );
      console.error("Error fetching categories:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const createCategory = async (data: {
    name: string;
    image: { url: string; key: string };
  }) => {
    try {
      setError(null);
      const response = await fetch(`/api/${storeId}/categories`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || "Failed to create category");
      }

      // Refetch categories after successful creation
      await fetchCategories();
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to create category")
      );
      console.error("Error creating category:", err);
      throw err;
    }
  };

  const updateCategory = async (
    categoryId: string,
    data: CategoryUpdateData
  ) => {
    try {
      setIsUpdating(true);
      setError(null);

      const response = await fetch(`/api/${storeId}/categories/${categoryId}`, {
        method: "PATCH", // Changed to PATCH as it's more appropriate for updates
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to update category");
      }

      const { category } = await response.json();

      // Update the local state with the updated category
      setCategories((prev) =>
        prev.map((cat) =>
          cat.id === categoryId ? { ...cat, ...category } : cat
        )
      );
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("Failed to update category")
      );
      console.error("Error updating category:", err);
      throw err;
    } finally {
      setIsUpdating(false);
    }
  };

  useEffect(() => {
    if (storeId) {
      fetchCategories();
    }
  }, [storeId]);

  return {
    categories,
    isLoading,
    isUpdating,
    error,
    refetch: fetchCategories,
    createCategory,
    updateCategory,
  };
};
