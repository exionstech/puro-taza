import Image from "next/image";
import React from "react";

const EmptyCart = () => {
  return (
    <div className="w-full flex items-center justify-center flex-col mt-10 gap-10 text-center">
        <h1 className="text-3xl">Opps ! Nothing in cart.</h1>
      <Image
        src={"/cart/empty-cart.png"}
        alt="empty cart"
        width={450}
        height={450}
        className="shrink-0"
      />
    </div>
  );
};

export default EmptyCart;
