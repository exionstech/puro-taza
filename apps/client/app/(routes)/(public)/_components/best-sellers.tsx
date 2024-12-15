import React from "react";
import ItemCard from "./sub-components/best-sellers/item-card";
import { Marquee } from "@/components/shared/marqee";

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

const BestSellers = () => {
  return (
    <section className="w-full max-w-screen-2xl h-auto px-5 md:px-14 flex items-center flex-col mx-auto gap-2 mt-10">
      <div className="w-full md:text-start text-center">
        <h1 className="text-3xl text-customBlack font-medium">Best Sellers</h1>
      </div>
      <Marquee
        pauseOnHover
        className="[--duration:50s] max-w-screen-2xl [mask-image:linear-gradient(to_right,transparent,black_5%,black_95%,transparent)]"
      >
        <div className="flex gap-4 w-max py-8 overflow-x-hidden">
          {items.map((item) => (
            <ItemCard key={item.id} product={item} />
          ))}
        </div>
      </Marquee>
    </section>
  );
};

export default BestSellers;
