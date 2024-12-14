"use client"
import React, { useState } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { X } from 'lucide-react';

interface ShoppingItemCardProps {
  item: {
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
  };
  updateItem: (item: ShoppingItemCardProps['item']) => void;
}

const ShoppingItemCard: React.FC<ShoppingItemCardProps> = ({ item, updateItem }) => {
  const [quantity, setQuantity] = useState(item.quantity);

  const handleIncrement = () => {
    setQuantity(quantity + 1);
    updateItem({ ...item, quantity: quantity + 1 });
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(quantity - 1);
      updateItem({ ...item, quantity: quantity - 1 });
    }
  };

  const handleRemove = () => {
    updateItem({ ...item, quantity: 0 });
  };

  return (
    <div className="w-full flex items-center justify-between px-3 py-5 border-none shadow-none">
      <div className="flex gap-5 items-center">
        <Image src={item.image} alt={item.name} height={150} width={150}className="shrink-0" />
        <div className="flex">
          <h1 className="text-lg font-semibold">{item.name}</h1>
        </div>
      </div>
      <div className="flex items-center justify-center gap-5">
      <div className="flex items-center gap-2">
            <Button variant={"outline"} size={"icon"} className='border-none' onClick={handleDecrement}>-</Button>
            <span>{quantity}</span>
            <Button variant={"outline"} size={"icon"} className='border-none' onClick={handleIncrement}>+</Button>
          </div>
        <Button variant={"outline"} size={"icon"} className='border-none' onClick={handleRemove}>
            <X/>
        </Button>
      </div>
    </div>
  );
};

export default ShoppingItemCard;