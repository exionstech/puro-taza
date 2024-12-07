import Image from "next/image";
import Link from "next/link";
import React from "react";

const CartItem = () => {
  return (
    <Link href={""} className="flex px-3 gap-2 bg-violet rounded-md py-2 cursor-pointer">
      <Image
        src={"/icons/shopping_cart.svg"}
        alt="cart"
        height={15}
        width={15}
        className="shrink-0"
      />
      <h1 className="text-white">Cart Item</h1>
    </Link>
  );
};

export default CartItem;
