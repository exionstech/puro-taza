import React, { useEffect, useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Product } from "@/types";
import Image from "next/image";
import useCart from '@/hooks/use-cart';

interface ItemCardProps {
  product: Product;
}

const ItemCard = ({ product }: ItemCardProps) => {
  const cart = useCart();
  const [quantity, setQuantity] = useState<number>(0);

  const {
    id,
    name: itemName = "Unknown Product",
    images = [{ url: "/placeholder-image.png" }],
    price: itemPrice = 0,
    discount = 0,
  } = product || {};

  const discountedPrice = itemPrice - (itemPrice * discount) / 100;

  useEffect(() => {
    const cartQty = cart.getItemQuantity(id);
    setQuantity(cartQty);
  }, [cart, id]);

  const addItem = () => {
    const newQuantity = quantity + 1;
    cart.addItem(product, newQuantity);
    setQuantity(newQuantity);
  };


  return (
    <Card className="px-5 py-4 items-center rounded-xl shadow-sm justify-center flex flex-col md:gap-2 w-full">
      <div className="w-full flex items-center justify-center overflow-hidden">
        <Image
          src={images[0].url}
          alt={itemName}
          height={250}
          width={250}
          className="shrink-0"
        />
      </div>
      <div className="flex flex-col w-full">
        <h1 className="text-customBlack text-xl font-normal">{itemName}</h1>
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold">
              <span className="text-sm font-medium text-red-500 mr-2">
                -{discount}%
              </span>{" "}
              {discountedPrice.toFixed(2)}/Kg
            </h1>
            <h2 className="text-xs line-through">M.R.P: {itemPrice}/kg</h2>
          </div>
          <div className="flex items-center justify-center">
              <Button
                onClick={addItem}
                variant={"outline"}
                className="border px-8 border-violet text-violet hover:bg-violet hover:text-white"
              >
                ADD
              </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ItemCard;