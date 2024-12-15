"use client"
import { FiShoppingCart } from "react-icons/fi";
import React, { useEffect, useState } from "react";
import useCart from "@/hooks/use-cart";
import { useRouter } from "next/navigation";

const CartItem = () => {
  const [mounted, setMounted] = useState(false);

  const cart = useCart();
  const router = useRouter();

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null;
  }
  
  return (
    <div 
    onClick={() => {
      router.push("/cart");
    }}
     className="flex items-center px-3 gap-2 bg-violet rounded-md py-2 cursor-pointer">
      <FiShoppingCart className="size-5" color="white"/>
      {cart.items.length > 0 ? <span className="text-white">{cart.items.length}</span> : <h1 className="text-white">Cart Item</h1>}
    </div>
  );
};

export default CartItem;
