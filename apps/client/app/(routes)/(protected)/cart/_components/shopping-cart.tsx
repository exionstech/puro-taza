"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ShoppingItemCard from "./shopping-item-card";
import OrderSummary from "./order-summary";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
  address: z.string().min(1, "Address is required"),
});

type FormData = z.infer<typeof formSchema>;

const ShoppingCart: React.FC = () => {
  const [items, setItems] = useState([
    {
      id: 1,
      name: "Bata Fish",
      image: "/home/seller-card/bata.png",
      price: 150,
      quantity: 2,
    },
    {
      id: 2,
      name: "Bhetki Fish",
      image: "/home/seller-card/bhetki.png",
      price: 150,
      quantity: 2,
    },
    {
      id: 3,
      name: "Mud Crab",
      image: "/home/seller-card/mud-crab.png",
      price: 150,
      quantity: 1,
    },
    {
      id: 4,
      name: "Pabda Fish",
      image: "/home/seller-card/pabda.png",
      price: 150,
      quantity: 2,
    },
    {
      id: 5,
      name: "Pomfret Fish",
      image: "/home/seller-card/pomphet.png",
      price: 150,
      quantity: 1,
    },
  ]);

  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  const onSubmit = (data: FormData) => {
    console.log(data);
  };

  const updateItem = (item: {
    id: number;
    name: string;
    image: string;
    price: number;
    quantity: number;
  }) => {
    setItems(items.map((i) => (i.id === item.id ? item : i)));
  };

  return (
    <div className="w-full flex flex-col gap-5 items-center justify-center">
      <div className="w-full mt-3">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
      </div>
      <div className="flex gap-5 w-full">
        <div className="w-[50%] flex flex-col mt-5 overflow-y-auto max-h-[500px]">
          {items.map((item) => (
            <ShoppingItemCard
              key={item.id}
              item={item}
              updateItem={updateItem}
            />
          ))}
        </div>
        <div className="w-[50%] flex flex-col">
          <OrderSummary items={items} />
          <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
            <div className="flex flex-col gap-4">
              <input
                {...register("name")}
                type="text"
                placeholder="Name"
                className="p-2 border border-gray-300 rounded"
              />
              <input
                {...register("email")}
                type="email"
                placeholder="Email"
                className="p-2 border border-gray-300 rounded"
              />
              <input
                {...register("mobile")}
                type="tel"
                placeholder="Mobile"
                className="p-2 border border-gray-300 rounded"
              />
              <textarea
                {...register("address")}
                placeholder="Address"
                className="p-2 border border-gray-300 rounded"
              />
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;
