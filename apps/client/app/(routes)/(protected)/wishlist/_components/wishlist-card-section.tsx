"use client";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import useWishlist from "@/hooks/use-wishlist";
import Image from "next/image";
import EmptyWishlist from "./empty-wishlist";
import useCart from "@/hooks/use-cart";

const WishlistCardSection = () => {
  const wishlist = useWishlist();
  const cart = useCart();

  if (wishlist.isLoading) {
    return (
      <>
        <div className="md:grid grid-cols-3 lg:grid-cols-4 gap-4 hidden">
          {[1, 2, 3, 4].map((item) => (
            <Card
              key={item}
              className="px-5 py-4 items-center rounded-xl shadow-sm justify-center flex flex-col md:gap-2 w-full animate-pulse"
            >
              <div className="w-full h-[30vh] 2xl:h-[25vh] bg-gray-200 rounded-xl" />
              <div className="flex flex-col w-full gap-4">
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="flex flex-col gap-4 items-center">
                  <div className="flex items-center gap-5 w-full">
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                  </div>
                  <div className="flex gap-5 w-full">
                    <div className="h-10 bg-gray-200 rounded w-1/2" />
                    <div className="h-10 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 md:hidden">
          {[1].map((item) => (
            <Card
              key={item}
              className="px-5 py-4 items-center rounded-xl shadow-sm justify-center flex flex-col md:gap-2 w-full animate-pulse"
            >
              <div className="w-full h-[30vh] 2xl:h-[25vh] bg-gray-200 rounded-xl" />
              <div className="flex flex-col w-full gap-4">
                <div className="h-6 bg-gray-200 rounded w-3/4" />
                <div className="flex flex-col gap-4 items-center">
                  <div className="flex items-center gap-5 w-full">
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                    <div className="h-4 bg-gray-200 rounded w-1/4" />
                  </div>
                  <div className="flex gap-5 w-full">
                    <div className="h-10 bg-gray-200 rounded w-1/2" />
                    <div className="h-10 bg-gray-200 rounded w-1/2" />
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </>
    );
  }

  if (wishlist.items.length === 0) {
    return (
      <div className="flex w-full items-center justify-center gap-4">
        <EmptyWishlist />
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {wishlist.items.map((product) => {
        const isInCart = cart.items.some((item) => item.id === product.id);
        return (
          <Card
            key={product.id}
            className="px-5 py-4 items-center rounded-xl shadow-sm justify-center flex flex-col md:gap-2 w-full"
          >
            <div className="w-full h-[22vh] 2xl:h-[20vh] flex items-center justify-center overflow-hidden">
              <Image
                src={product.image[0]?.url || "/bata.png"}
                alt={product.name}
                height={160}
                width={160}
                className="shrink-0 rounded-xl hidden md:flex"
              />
              <Image
                src={product.image[0]?.url || "/bata.png"}
                alt={product.name}
                height={200}
                width={200}
                className="shrink-0 rounded-xl md:hidden"
              />
            </div>
            <div className="flex flex-col w-full">
              <h1 className="text-customBlack text-xl font-normal">
                {product.name}
              </h1>
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
                    {(
                      product.price -
                      (product.price * (product.discount || 0)) / 100
                    ).toFixed(2)}
                    /Kg
                  </h1>
                  <h2 className="text-xs line-through">
                    M.R.P: {product.price}/kg
                  </h2>
                </div>
                <div className="flex lg:gap-3 justify-between w-full">
                  <Button
                    onClick={() => cart.addItem(product)}
                    variant={isInCart ? "secondary" : "outline"}
                    className={`border md:px-8 px-12 ${
                      isInCart
                        ? "text-white cursor-not-allowed bg-violet"
                        : "border-violet text-violet hover:bg-violet hover:text-white"
                    }`}
                    disabled={isInCart || product.stock <= 0}
                  >
                    {isInCart ? "Carted" : "Cart"}
                  </Button>
                  <Button
                    onClick={() => wishlist.removeItem(product.id)}
                    className="w-auto md:px-4 px-8 font-medium"
                  >
                    Remove
                  </Button>
                </div>
              </div>
            </div>
          </Card>
        );
      })}
    </div>
  );
};

export default WishlistCardSection;
