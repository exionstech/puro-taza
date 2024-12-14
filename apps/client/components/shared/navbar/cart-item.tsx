import { FiShoppingCart } from "react-icons/fi";
import Link from "next/link";
import React from "react";

const CartItem = () => {
  return (
    <Link href={"/cart"} className="flex items-center px-3 gap-2 bg-violet rounded-md py-2 cursor-pointer">
      <FiShoppingCart className="size-5" color="white"/>
      <h1 className="text-white">Cart Item</h1>
    </Link>
  );
};

export default CartItem;
