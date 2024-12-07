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
    <Card className="px-3 py-3 items-center justify-center flex flex-col md:gap-2 w-full">
      <div className="w-full flex items-center justify-center">
        <Image
          src={itemImage}
          alt={itemName}
          height={250}
          width={250}
          className="shrink-0"
        />
      </div>
      <div className="flex flex-col w-full">
        <h1 className="text-customBlack text-xl">{itemName}</h1>
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold">
              <span className="text-sm font-medium text-red-500">-{discount}%</span>{" "}
              {discountedPrice}/Kg
            </h1>
            <h2 className="text-xs line-through">M.R.P:{" "}{itemPrice}/kg</h2>
          </div>
          <div className="flex items-center justify-center">
            <Button variant={"outline"} className="border border-violet text-violet">
              ADD
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default ItemCard;
