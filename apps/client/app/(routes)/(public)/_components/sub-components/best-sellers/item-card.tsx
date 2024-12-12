import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Image from "next/image";

interface ItemCardProps {
  itemName: string;
  itemImage: string;
  itemPrice: number;
  discount: number;
}

const ItemCard = ({
  itemName,
  itemImage,
  itemPrice,
  discount,
}: ItemCardProps) => {
  const discountedPrice = itemPrice - (itemPrice * discount) / 100;

  return (
    <div className="relative">
      <Card
        className="px-5 py-4 items-center justify-center flex flex-col md:gap-2 w-full 
                   transition-all duration-500 ease-in-out 
                   hover:scale-100 hover:shadow-sm 
                   cursor-pointer peer"
      >
        <div className="w-full flex items-center justify-center overflow-hidden">
          <Image
            src={itemImage}
            alt={itemName}
            height={250}
            width={250}
            className="shrink-0 transition-transform duration-300 
                       peer-hover:scale-110"
          />
        </div>
        <div className="flex flex-col w-full">
          <h1
            className="text-customBlack text-xl font-medium transition-colors duration-300 
                         peer-hover:text-violet"
          >
            {itemName}
          </h1>
          <div className="w-full flex items-center justify-between">
            <div className="flex flex-col">
              <h1 className="text-lg font-semibold">
                <span
                  className="text-sm font-medium text-red-500 transition-transform duration-300 
                                peer-hover:scale-110 mr-2"
                >
                  -{discount}%
                </span>{" "}
                {discountedPrice}/Kg
              </h1>
              <h2 className="text-xs line-through">M.R.P: {itemPrice}/kg</h2>
            </div>
            <div className="flex items-center justify-center">
              <Button
                variant={"outline"}
                className="border px-8 border-violet text-violet 
                           transition-all duration-300 
                           peer-hover:bg-violet peer-hover:text-white"
              >
                ADD
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ItemCard;
