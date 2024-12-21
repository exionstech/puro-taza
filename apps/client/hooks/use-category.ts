import { useState, useEffect } from 'react';
import { Category, Product } from '@/types';

interface CategoriesResponse {
  categories: Category[];
}

interface CategoryResponse {
  category: Category & {
    product: Product[];
  };
}

export const useCategories = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_STORE_ID}/categories`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }

        const data: CategoriesResponse = await response.json();
        setCategories(data.categories);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
        console.error('Error fetching categories:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { categories, isLoading, error };
};

export const useCategory = (categoryId: string) => {
  const [category, setCategory] = useState<(Category & { product: Product[] }) | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCategory = async () => {
      if (!categoryId) return;

      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_STORE_ID}/categories/${categoryId}`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch category');
        }

        const data: CategoryResponse = await response.json();
        setCategory(data.category);
        setProducts(data.category.product || []);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Something went wrong');
        console.error('Error fetching category:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategory();
  }, [categoryId]);

  return { category, products, isLoading, error };
};

export const useCategoryProducts = () => {
  const [categoryProducts, setCategoryProducts] = useState<Map<string, Product[]>>(new Map());
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProductsByCategory = async (categoryId: string) => {
    if (!categoryId) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_STORE_ID}/categories/${categoryId}`
      );

      if (!response.ok) {
        throw new Error('Failed to fetch category products');
      }

      const data: CategoryResponse = await response.json();
      setCategoryProducts(prev => new Map(prev.set(categoryId, data.category.product || [])));
      
      return data.category.product;
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong');
      console.error('Error fetching category products:', err);
      return [];
    } finally {
      setIsLoading(false);
    }
  };

  return { 
    categoryProducts, 
    fetchProductsByCategory, 
    isLoading, 
    error 
  };
};