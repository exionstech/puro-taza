import { useState, useEffect } from 'react';
import { useCategory } from "@/hooks/use-category";
import { Product } from "@/types";
import CategoryProductCard from '../../../_components/category-product-card';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';

interface RelatedProductsProps {
  categoryId: string | null;
  currentProductId?: string;
}

const RelatedProducts = ({ categoryId, currentProductId }: RelatedProductsProps) => {
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const {
    products,
    isLoading,
    error
  } = useCategory(categoryId || "");

  useEffect(() => {
    if (products && products.length > 0) {
      const filtered = products
        .filter(product => product.id !== currentProductId)
        .slice(0, 12);
      setRelatedProducts(filtered);
    }
  }, [products, currentProductId]);

  if (isLoading) {
    return (
      <div className="w-full flex items-center">
          <div className="w-full md:flex gap-5 hidden">
    {[...Array(4)].map((_, i) => (
      <Card key={i} className="px-5 py-4 rounded-xl shadow-sm w-full">
        <div className="space-y-4">
          <Skeleton className="w-full h-[180px] rounded-lg" />
          <Skeleton className="h-4 w-full" />
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <Skeleton className="h-2 w-full" />
              <Skeleton className="h-2 w-full" />
            </div>
            <Skeleton className="h-5 w-full" />
          </div>
        </div>
      </Card>
    ))}
  </div>
  <div className="w-full flex gap-5 md:hidden">
      <Card className="px-5 py-4 rounded-xl shadow-sm w-full">
        <div className="space-y-4">
          <Skeleton className="w-full h-[180px] rounded-lg" />
          <Skeleton className="h-4 w-full" />
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <Skeleton className="h-2 w-full" />
              <Skeleton className="h-2 w-full" />
            </div>
            <Skeleton className="h-5 w-full" />
          </div>
        </div>
      </Card>
  </div>
      </div>
    );
  }

  if (error || !relatedProducts.length) {
    return null;
  }

  return (
    <div className="w-full">
      <h2 className="text-2xl font-semibold mb-6">Related Products</h2>
      <div className="w-full md:max-h-[500px] overflow-y-auto scroll-smooth py-5">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-5 gap-4">
          {relatedProducts.map((product) => (
            <CategoryProductCard 
              key={product.id} 
              product={product}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default RelatedProducts;