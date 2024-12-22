"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useWishlist from "@/hooks/use-wishlist";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

const WishlistCardSection = () => {
  const wishlist = useWishlist();
  const router = useRouter();

  if (wishlist.items.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[400px] gap-4">
        <h2 className="text-2xl font-semibold">Your wishlist is empty</h2>
        <p className="text-gray-500">Add items to your wishlist to see them here</p>
        <Link href="/category">
          <Button className="mt-4">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {wishlist.items.map((product) => (
          <Card key={product.id} className="px-5 py-4 items-center rounded-xl shadow-sm justify-center flex flex-col md:gap-2 w-full">
            <div className="w-full h-[30vh] 2xl:h-[25vh] flex items-center justify-center overflow-hidden">
              <Image
                src={product.image[0]?.url || "/bata.png"}
                alt={product.name}
                height={150}
                width={150}
                className="shrink-0 rounded-xl"
              />
            </div>
            <div className="flex flex-col w-full">
              <h1 className="text-customBlack text-xl font-normal">{product.name}</h1>
              <div className="w-full flex flex-col gap-4 items-center">
                <div className="flex items-center gap-5 w-full text-start">
                  <h1 className="text-lg font-semibold">
                    {(product.discount ?? 0) > 0 ? (
                      <span className="text-sm font-medium text-red-500 mr-2">
                        -{product.discount}%
                      </span>
                    ) : (
                      <span className="text-sm font-medium text-red-500 mr-2">
                        -0%
                      </span>
                    )}
                    {(product.price - (product.price * (product.discount || 0)) / 100).toFixed(2)}/Kg
                  </h1>
                  <h2 className="text-xs line-through">M.R.P: {product.price}/kg</h2>
                </div>
                <div className="flex gap-5 w-full">
                  <Button 
                    onClick={() => router.push(`/category/products/${product.id}`)} 
                    className="w-1/2"
                  >
                    View
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => wishlist.removeItem(product.id)}
                    className="w-1/2 border-violet text-violet font-medium"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
  );
};

export default WishlistCardSection;