"use client";

import { useState, useEffect } from "react";
import ShoppingItemCard from "./shopping-item-card";
import OrderSummary from "./order-summary";
import useCart from "@/hooks/use-cart";
import { useAuth } from "@/hooks/use-auth";
import { useAddressManagement } from "@/hooks/use-address";
import EmptyCart from "./empty-cart";
import CheckoutForm from "./checkout-form";

const ShoppingCart = () => {
  const cart = useCart();
  const { user } = useAuth();
  const { addresses, isLoading: isLoadingAddresses } = useAddressManagement(
    user?.id ?? ""
  );
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const calculateOrderSummary = () => {
    const itemsWithDiscount = cart.items.map((item) => ({
      ...item,
      discountedPrice: item.price * (1 - (item.discount || 0) / 100),
    }));

    const subtotal = itemsWithDiscount.reduce(
      (total, item) => total + item.discountedPrice * item.qty,
      0
    );

    const tax = subtotal * 0.05;
    const shipping = subtotal * 0.05;
    const total = subtotal + tax + shipping;

    return {
      items: itemsWithDiscount,
      subtotal,
      tax,
      shipping,
      total,
    };
  };

  const handleSubmit = (data: any) => {
    const orderSummary = calculateOrderSummary();
    const selectedAddress = addresses.find(
      (addr) => addr.id === data.selectedAddressId
    );

    const orderDetails = {
      customerInfo: {
        ...data,
        addressDetails: selectedAddress,
      },
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

    console.log(
      "Selected Address:",
      selectedAddress,
      "Address ID:" + data
    )
  };

  if (isLoading || isLoadingAddresses) {
    return (
      <div className="w-full h-[60vh] flex items-center justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900" />
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
      <div className="flex flex-col lg:flex-row gap-5 w-full">
        <div className="lg:w-[50%] w-full flex flex-col mt-5 overflow-y-auto max-h-[500px] scroll-smooth">
          {cart.items.map((item) => {
            const discountedPrice =
              item.price * (1 - (item.discount || 0) / 100);
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
        <div className="lg:w-[50%] w-full flex flex-col">
          <OrderSummary
            items={cart.items}
            orderSummary={calculateOrderSummary()}
          />
          <CheckoutForm 
            user={user}
            addresses={addresses}
            onSubmit={handleSubmit}
          />
        </div>
      </div>
    </div>
  );
};

export default ShoppingCart;