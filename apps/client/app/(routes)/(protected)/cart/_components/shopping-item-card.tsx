"use client"
import React from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';
import useCart from '@/hooks/use-cart';

interface ShoppingItemCardProps {
  item: {
    id: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    discount: number;
    discountedPrice: number;
  };
}

const ShoppingItemCard: React.FC<ShoppingItemCardProps> = ({ item }) => {
  const cart = useCart();


  const handleIncrement = () => {
    cart.updateItemQuantity(item.id, item.quantity + 1);
  };

  const handleDecrement = () => {
    if (item.quantity > 1) {
      cart.updateItemQuantity(item.id, item.quantity - 1);
    }
  };

  const handleRemove = () => {
    cart.removeItem(item.id);
  };

  return (
    <div className="w-full flex items-center justify-between px-3 py-5 border-b-2 border-muted">
      <div className="flex gap-5 items-center">
        <Image 
          src={item.image} 
          alt={item.name} 
          height={150} 
          width={150} 
          className="shrink-0" 
        />
        <div className="flex flex-col">
          <h1 className="text-lg font-semibold">{item.name}</h1>
          {item.discountedPrice > 0 && (
            <div className="flex items-center gap-2">
              <span className="line-through text-muted-foreground text-sm">
                ₹{item.price.toFixed(2)}
              </span>
              <span className="text-green-600 text-sm">
                {item.discount}% OFF
              </span>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center justify-center gap-5">
        <div className="flex items-center gap-2">
          <Button 
            variant={"outline"} 
            size={"icon"} 
            className='border-none' 
            onClick={handleDecrement}
          >
            -
          </Button>
          <span>{item.quantity}</span>
          <Button 
            variant={"outline"} 
            size={"icon"} 
            className='border-none' 
            onClick={handleIncrement}
          >
            +
          </Button>
        </div>
        <h1 className="text-lg font-semibold">₹{item.discountedPrice}</h1>
        <Button 
          variant={"outline"} 
          size={"icon"} 
          className='border-none' 
          onClick={handleRemove}
        >
          <X/>
        </Button>
      </div>
    </div>
  );
};

export default ShoppingItemCard;