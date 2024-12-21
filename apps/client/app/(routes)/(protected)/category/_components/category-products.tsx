import { useState } from 'react';
import { useCategory } from '@/hooks/use-category';
import CategoryProductCard from './category-product-card';

const CategoryProducts = ({ selectedCategoryId }: { selectedCategoryId: string | null }) => {
  const { products, isLoading, error } = useCategory(selectedCategoryId || '');

  if (!selectedCategoryId) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-muted-foreground text-lg">Select a category to view products</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p>Loading products...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="w-full h-full flex items-center justify-center">
        <p className="text-muted-foreground">No products found in this category</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {products.map((product) => (
        <CategoryProductCard key={product.id} product={product} />
      ))}
    </div>
  );
};

export default CategoryProducts;