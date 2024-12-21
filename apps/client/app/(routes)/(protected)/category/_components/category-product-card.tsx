import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Product } from "@/types";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface CategoryProductCardProps {
  product: Product;
}

const CategoryProductCard = ({ product }: CategoryProductCardProps) => {
  const router = useRouter();

  const { id, name, image, price, discount = 0 } = product;

  const onClick = () => {
    router.push(`/category/product/${id}`);
  };

  const discountedPrice = price - (price * discount) / 100;

  return (
    <Card className="px-5 py-4 items-center rounded-xl shadow-sm justify-center flex flex-col md:gap-2 w-full">
      <div className="w-full h-[30vh] 2xl:h-[25vh] flex items-center justify-center overflow-hidden">
        <Image
          src={image[0]?.url || "/bata.png"}
          alt={name}
          height={150}
          width={150}
          className="shrink-0 rounded-xl"
        />
      </div>
      <div className="flex flex-col w-full">
        <h1 className="text-customBlack text-xl font-normal">{name}</h1>
        <div className="w-full flex items-center justify-between">
          <div className="flex flex-col">
            <h1 className="text-lg font-semibold">
              {discount > 0 ? (
                <span className="text-sm font-medium text-red-500 mr-2">
                  -{discount}%
                </span>
              ) : (
                <span className="text-sm font-medium text-red-500 mr-2">
                  -0%
                </span>
              )}
              {discountedPrice.toFixed(2)}/Kg
            </h1>
            <h2 className="text-xs line-through">M.R.P: {price}/kg</h2>
          </div>
          <div className="flex items-center justify-center">
            <Button onClick={onClick} className="px-12 md:px-8">View</Button>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CategoryProductCard;
