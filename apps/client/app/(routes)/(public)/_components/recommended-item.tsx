import React from "react";
import ItemCard from "./sub-components/best-sellers/item-card";
import CustomSwiper from "@/components/shared/swiper";

type Product = {
  id: string;
  name: string;
  description: string;
  price: number;
  discount: number;
  images: { url: string }[];
  category: string;
  qty: number;
};

const items: Product[] = [
  {
    id: "1",
    name: "Rohu (Rui Fish)",
    description: "Fresh Rohu Fish",
    price: 150,
    discount: 25,
    images: [{ url: "/home/seller-card/rui.png" }],
    category: "Fish",
    qty: 1,
  },
  {
    id: "2",
    name: "Katla Fish",
    description: "Fresh Katla Fish",
    price: 150,
    discount: 11,
    images: [{ url: "/home/seller-card/katla.png" }],
    category: "Fish",
    qty: 1,
  },
  {
    id: "3",
    name: "Topshey Fish",
    description: "Fresh Topshey Fish",
    price: 150,
    discount: 14,
    images: [{ url: "/home/seller-card/topshey.png" }],
    category: "Fish",
    qty: 1,
  },
  {
    id: "4",
    name: "Bata Fish",
    description: "Fresh Bata Fish",
    price: 150,
    discount: 10,
    images: [{ url: "/home/seller-card/bata.png" }],
    category: "Fish",
    qty: 1,
  },
  {
    id: "5",
    name: "Bhetki Fish",
    description: "Fresh Bhetki Fish",
    price: 150,
    discount: 20,
    images: [{ url: "/home/seller-card/bhetki.png" }],
    category: "Fish",
    qty: 1,
  },
  {
    id: "6",
    name: "Mud Crab",
    description: "Fresh Mud Crab",
    price: 150,
    discount: 8,
    images: [{ url: "/home/seller-card/mud-crab.png" }],
    category: "Crab",
    qty: 1,
  },
  {
    id: "7",
    name: "Pabda Fish",
    description: "Fresh Pabda Fish",
    price: 150,
    discount: 20,
    images: [{ url: "/home/seller-card/pabda.png" }],
    category: "Fish",
    qty: 1,
  },
  {
    id: "8",
    name: "Pomfret Fish",
    description: "Fresh Pomfret Fish",
    price: 150,
    discount: 20,
    images: [{ url: "/home/seller-card/pomphet.png" }],
    category: "Fish",
    qty: 1,
  },
];

const RecommendedItem = () => {
  return (
    <section className="w-full max-w-screen-2xl h-auto px-5 md:px-10 flex items-center flex-col mx-auto gap-10 mt-10 md:mt-14">
      <div className="w-full md:text-start text-center">
        <h1 className="text-3xl text-customBlack font-medium select-none">Recommended</h1>
      </div>
      <CustomSwiper>
        {items.map((item) => (
          <ItemCard key={item.id} product={item} />
        ))}
      </CustomSwiper>
    </section>
  );
};

export default RecommendedItem;
