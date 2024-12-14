import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

import Image from "next/image";

interface ItemCardProps {
  itemName: string;
  itemImage: string;
  totalItems: number;
  isComplete: boolean;
}

const HistoryOrderCard = ({
  itemName,
  itemImage,
  totalItems,
  isComplete,
}: ItemCardProps) => {
  return (
    <div className="w-full flex items-center justify-between px-3 py-5 border-none shadow-none">
      <div className="flex gap-6 items-center justify-center">
        <Image
          src={itemImage}
          alt={itemName}
          height={200}
          width={200}
          className="shrink-0"
        />
        <div className="md:flex flex-col justify-between hidden">
          <div
            className={cn(
              "text-sm font-semibold",
              isComplete ? "text-green-600" : "text-red-600"
            )}
          >
            {isComplete ? "Delivered" : "Cancelled"}
          </div>
          <div className="flex flex-col gap-1">
            <h1 className="text-lg font-semibold">{itemName}</h1>
            <h1 className="text-sm text-customGray">{totalItems} items</h1>
          </div>
        </div>
      </div>
      <div className="md:flex items-center justify-center hidden">
        <Button className="px-6">Track Order</Button>
      </div>

      <div className="flex flex-col gap-1 items-center justify-center md:hidden">
        <div
          className={cn(
            "text-sm font-semibold",
            isComplete ? "text-green-600" : "text-red-600"
          )}
        >
          {isComplete ? "Delivered" : "Cancelled"}
        </div>
        <h1 className="text-lg font-semibold">{itemName}</h1>
        <h1 className="text-sm text-customGray">{totalItems} items</h1>
        <Button className="px-6">Track Order</Button>
      </div>
    </div>
  );
};

export default HistoryOrderCard;
