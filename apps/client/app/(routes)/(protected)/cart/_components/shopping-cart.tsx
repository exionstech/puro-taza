"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";
import ShoppingItemCard from "./shopping-item-card";
import OrderSummary from "./order-summary";
import useCart from "@/hooks/use-cart";
import EmptyCart from "./empty-cart";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAuth } from "@/hooks/use-auth";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
  address: z.string().min(1, "Address is required"),
});

type FormData = z.infer<typeof formSchema>;

const ShoppingCart = () => {
  const { user } = useAuth();
  const cart = useCart();
  const [isLoading, setIsLoading] = useState(true);

  const { register, handleSubmit, formState } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  });

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const calculateOrderSummary = () => {
    const itemsWithDiscount = cart.items.map(item => ({
      ...item,
      discountedPrice: item.price * (1 - (item.discount || 0) / 100)
    }));

    const subtotal = itemsWithDiscount.reduce((total, item) =>
      total + item.discountedPrice * item.qty, 0);

    const tax = subtotal * 0.05;
    const shipping = subtotal * 0.05;
    const total = subtotal + tax + shipping;

    return {
      items: itemsWithDiscount,
      subtotal,
      tax,
      shipping,
      total
    };
  };

  const onSubmit = (data: FormData) => {
    const orderSummary = calculateOrderSummary();

    const orderDetails = {
      customerInfo: data,
      items: cart.items.map((item) => ({
        id: item.id,
        name: item.name,
        quantity: item.qty,
        price: item.price,
        total: item.price * item.qty,
        image: item.image?.[0]?.url || "/placeholder-image.png",
      })),
      orderSummary: {
        subtotal: orderSummary.subtotal,
        tax: orderSummary.tax,
        shipping: orderSummary.shipping,
        total: orderSummary.total,
      },
    };

    console.log("Complete Order Details:", orderDetails);
    // Handle order submission
  };

  if (isLoading) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  if (!isLoading && cart.items.length === 0) {
    return <EmptyCart />;
  }

  return (
    <div className="w-full flex flex-col gap-5 items-center justify-center">
      <div className="w-full mt-3">
        <h1 className="text-2xl font-bold">Shopping Cart</h1>
      </div>
      <div className="flex flex-col md:flex-row gap-5 w-full">
        <div className="md:w-[50%] w-full flex flex-col mt-5 overflow-y-auto max-h-[500px]">
          {cart.items.map((item) => {
            const discountedPrice = item.price * (1 - (item.discount || 0) / 100);
            return (
              <ShoppingItemCard
                key={item.id}
                item={{
                  id: item.id,
                  name: item.name,
                  image: item.image?.[0]?.url || "/placeholder-image.png",
                  price: item.price,
                  discountedPrice,
                  discount: item.discount || 0,
                  quantity: item.qty,
                }}
              />
            );
          })}
        </div>
        <div className="md:w-[50%] w-full flex flex-col">
          <OrderSummary
            items={cart.items}
            orderSummary={calculateOrderSummary()}
          />
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
              <Button type="submit" className="w-full">
                Place Order
              </Button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;