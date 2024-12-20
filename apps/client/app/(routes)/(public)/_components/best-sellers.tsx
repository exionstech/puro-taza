import React from "react";
import ItemCard from "./sub-components/best-sellers/item-card";
import CustomSwiper from "@/components/shared/swiper";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useProducts from "@/hooks/use-product";

const BestSellersSkeleton = () => (
  <div className="w-full flex gap-5">
    {[...Array(4)].map((_, i) => (
      <Card key={i} className="px-5 py-4 rounded-xl shadow-sm w-full">
        <div className="space-y-4">
          <Skeleton className="w-full h-[150px] rounded-lg" />
          <Skeleton className="h-4 w-3/4" />
          <div className="flex justify-between items-center">
            <div className="space-y-2">
              <Skeleton className="h-2 w-20" />
              <Skeleton className="h-2 w-24" />
            </div>
            <Skeleton className="h-5 w-24" />
          </div>
        </div>
      </Card>
    ))}
  </div>
);

const BestSellers = () => {
  const { products, isLoading, error } = useProducts();

  if (error) {
    return null;
  }

  return (
    <section className="w-full max-w-screen-2xl h-auto px-5 md:px-14 flex items-center flex-col mx-auto gap-10 mt-10">
      <div className="w-full md:text-start text-center">
        <h1 className="text-3xl text-customBlack font-medium select-none">
          Best Sellers
        </h1>
        <div className="w-full md:text-start text-center">
          {isLoading && (
            <Skeleton className="h-8 w-48" />
          )}
        </div>
      </div>
      {isLoading ? (
        <BestSellersSkeleton />
      ) : (
        <CustomSwiper>
          {products.map((item) => (
            <ItemCard key={item.id} product={item} />
          ))}
        </CustomSwiper>
      )}
    </section>
  );
};

export default BestSellers;