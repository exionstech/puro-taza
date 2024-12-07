import { Card } from '@/components/ui/card';
import React from 'react'

const ItemCard = () => {
  return (
      <Card>
        <div className="flex flex-col items-center justify-center">
          <div className="w-full h-[200px] bg-gray-200"></div>
          <div className="flex flex-col items-center justify-center p-4">
            <h1 className="text-lg font-bold">Item Name</h1>
            <p className="text-sm">Item Description</p>
            <p className="text-lg font-bold">$10.00</p>
          </div>
        </div>
      </Card>
  )
}

export default ItemCard;
