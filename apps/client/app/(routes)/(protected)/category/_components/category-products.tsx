import { useState, useEffect } from "react";
import { useCategory, useCategories } from "@/hooks/use-category";
import CategoryProductCard from "./category-product-card";
import { Product } from "@/types";
import { ArrowDown, ArrowDownUp, SlidersHorizontal } from "lucide-react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

const CategoryProducts = ({
  selectedCategoryId,
}: {
  selectedCategoryId: string | null;
}) => {
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [isLoadingAll, setIsLoadingAll] = useState(false);
  const {
    products,
    isLoading: isCategoryLoading,
    error: categoryError,
  } = useCategory(selectedCategoryId || "");
  const { categories } = useCategories();

  useEffect(() => {
    const fetchAllProducts = async () => {
      if (!categories || categories.length === 0) return;

      setIsLoadingAll(true);
      try {
        const productsPromises = categories.map(async (category) => {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/${process.env.NEXT_PUBLIC_STORE_ID}/categories/${category.id}`
          );
          if (!response.ok) throw new Error("Failed to fetch products");
          const data = await response.json();
          return data.category.product || [];
        });

        const productsArrays = await Promise.all(productsPromises);
        const allProductsFlat = productsArrays.flat();
        setAllProducts(allProductsFlat);
      } catch (error) {
        console.error("Error fetching all products:", error);
      } finally {
        setIsLoadingAll(false);
      }
    };

    if (!selectedCategoryId) {
      fetchAllProducts();
    }
  }, [categories, selectedCategoryId]);

  if (selectedCategoryId ? isCategoryLoading : isLoadingAll) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  // Error state
  if (selectedCategoryId && categoryError) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
      </div>
    );
  }

  // No products state
  const displayProducts = selectedCategoryId ? products : allProducts;
  if (displayProducts.length === 0) {
    return (
      <div className="w-full h-[400px] flex items-center justify-center font-medium text-xl gap-5">
        No products Available
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-violet" />
      </div>
    );
  }

  // Display products
  return (
   <div className="w-full flex flex-col gap-10 items-center">
    <div className="flex gap-5 w-full items-start">
    <Select>
      <SelectTrigger className="flex items-center gap-2 cursor-pointer w-auto text-violet">
        <SlidersHorizontal className="w-5 h-5" />
        <SelectValue placeholder="Filters" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Fruits</SelectLabel>
          <SelectItem value="apple">Apple</SelectItem>
          <SelectItem value="banana">Banana</SelectItem>
          <SelectItem value="blueberry">Blueberry</SelectItem>
          <SelectItem value="grapes">Grapes</SelectItem>
          <SelectItem value="pineapple">Pineapple</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    <Select>
      <SelectTrigger className="flex items-center gap-2 cursor-pointer w-auto text-violet">
      <ArrowDownUp className="w-5 h-5 text-violet" />
        <SelectValue placeholder="Sort" />
      </SelectTrigger>
      <SelectContent>
        <SelectGroup>
          <SelectLabel>Price</SelectLabel>
          <SelectItem value="0">100 - 300</SelectItem>
          <SelectItem value="300">300 - 600</SelectItem>
          <SelectItem value="600">600 - 1000</SelectItem>
          <SelectItem value="1000">more than 1000</SelectItem>
        </SelectGroup>
      </SelectContent>
    </Select>
    </div>
     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 w-full">
      {displayProducts.map((product) => (
        <CategoryProductCard key={product.id} product={product} />
      ))}
    </div>
   </div>
  );
};

export default CategoryProducts;
