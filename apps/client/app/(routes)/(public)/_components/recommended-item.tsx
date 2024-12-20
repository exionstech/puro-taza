import React from "react";
import ItemCard from "./sub-components/best-sellers/item-card";
import CustomSwiper from "@/components/shared/swiper";
import { Product } from "@/types";

const items: Product[] = [
  {
    id: "1",
    name: "Rohu (Rui Fish)",
    description: "Fresh Rohu Fish - Premium Quality Bengali Rohu",
    price: 150,
    stock: 100,
    discount: 25,
    image: [
      {
        id: "rui-1",
        url: "/home/seller-card/rui.png",
        key: "rui-main"
      }
    ],
    subcategories: [],
    categoryId: "fish",
    category: {
      id: "fish",
      name: "Fish",
      image: [
        {
          id: "cat-fish",
          url: "/categories/fish.png",
          key: "fish-category"
        }
      ]
    }
  },
  {
    id: "2",
    name: "Katla Fish",
    description: "Fresh Katla Fish - Premium Quality Bengali Katla",
    price: 150,
    stock: 80,
    discount: 11,
    image: [
      {
        id: "katla-1",
        url: "/home/seller-card/katla.png",
        key: "katla-main"
      }
    ],
    subcategories: [],
    categoryId: "fish",
    category: {
      id: "fish",
      name: "Fish",
      image: [
        {
          id: "cat-fish",
          url: "/categories/fish.png",
          key: "fish-category"
        }
      ]
    }
  },
  {
    id: "3",
    name: "Topshey Fish",
    description: "Fresh Topshey Fish - Premium Quality Bengali Topshey",
    price: 150,
    stock: 120,
    discount: 14,
    image: [
      {
        id: "topshey-1",
        url: "/home/seller-card/topshey.png",
        key: "topshey-main"
      }
    ],
    subcategories: [],
    categoryId: "fish",
    category: {
      id: "fish",
      name: "Fish",
      image: [
        {
          id: "cat-fish",
          url: "/categories/fish.png",
          key: "fish-category"
        }
      ]
    }
  },
  {
    id: "4",
    name: "Bata Fish",
    description: "Fresh Bata Fish - Premium Quality Bengali Bata",
    price: 150,
    stock: 90,
    discount: 10,
    image: [
      {
        id: "bata-1",
        url: "/home/seller-card/bata.png",
        key: "bata-main"
      }
    ],
    subcategories: [],
    categoryId: "fish",
    category: {
      id: "fish",
      name: "Fish",
      image: [
        {
          id: "cat-fish",
          url: "/categories/fish.png",
          key: "fish-category"
        }
      ]
    }
  },
  {
    id: "5",
    name: "Bhetki Fish",
    description: "Fresh Bhetki Fish - Premium Quality Bengali Bhetki",
    price: 150,
    stock: 70,
    discount: 20,
    image: [
      {
        id: "bhetki-1",
        url: "/home/seller-card/bhetki.png",
        key: "bhetki-main"
      }
    ],
    subcategories: [],
    categoryId: "fish",
    category: {
      id: "fish",
      name: "Fish",
      image: [
        {
          id: "cat-fish",
          url: "/categories/fish.png",
          key: "fish-category"
        }
      ]
    }
  },
  {
    id: "6",
    name: "Mud Crab",
    description: "Fresh Mud Crab - Premium Quality Bengali Crab",
    price: 150,
    stock: 50,
    discount: 8,
    image: [
      {
        id: "crab-1",
        url: "/home/seller-card/mud-crab.png",
        key: "crab-main"
      }
    ],
    subcategories: [],
    categoryId: "crab",
    category: {
      id: "crab",
      name: "Crab",
      image: [
        {
          id: "cat-crab",
          url: "/categories/crab.png",
          key: "crab-category"
        }
      ]
    }
  },
  {
    id: "7",
    name: "Pabda Fish",
    description: "Fresh Pabda Fish - Premium Quality Bengali Pabda",
    price: 150,
    stock: 85,
    discount: 20,
    image: [
      {
        id: "pabda-1",
        url: "/home/seller-card/pabda.png",
        key: "pabda-main"
      }
    ],
    subcategories: [],
    categoryId: "fish",
    category: {
      id: "fish",
      name: "Fish",
      image: [
        {
          id: "cat-fish",
          url: "/categories/fish.png",
          key: "fish-category"
        }
      ]
    }
  },
  {
    id: "8",
    name: "Pomfret Fish",
    description: "Fresh Pomfret Fish - Premium Quality Bengali Pomfret",
    price: 150,
    stock: 60,
    discount: 20,
    image: [
      {
        id: "pomfret-1",
        url: "/home/seller-card/pomphet.png",
        key: "pomfret-main"
      }
    ],
    subcategories: [],
    categoryId: "fish",
    category: {
      id: "fish",
      name: "Fish",
      image: [
        {
          id: "cat-fish",
          url: "/categories/fish.png",
          key: "fish-category"
        }
      ]
    }
  }
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
