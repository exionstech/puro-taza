"use client";

import { useForm } from "react-hook-form";
import { z } from "zod";
import { useState, useEffect } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { Separator } from "@/components/ui/separator";

const formSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  mobile: z.string().min(10, "Mobile number must be at least 10 digits"),
  address: z.string().min(1, "Address is required"),
});

type FormData = z.infer<typeof formSchema>;

interface CheckoutFormProps {
  user: any;
  addresses: any[];
  onSubmit: (data: FormData) => void;
}

const CheckoutForm = ({ user, addresses, onSubmit }: CheckoutFormProps) => {
  const [selectedAddressId, setSelectedAddressId] = useState<string>("");

  const { register, handleSubmit, formState, setValue, watch } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: user?.name || "",
      email: user?.email || "",
      mobile: user?.phone || "",
      address: "",
    },
  });

  const watchedAddress = watch("address");

  useEffect(() => {
    if (addresses.length > 0) {
      const defaultAddress = addresses.find((addr) => addr.isDefault);
      if (defaultAddress) {
        setSelectedAddressId(defaultAddress.id);
        const formattedAddress = formatAddressToString(defaultAddress);
        setValue("address", formattedAddress);
      }
    }
  }, [addresses, setValue]);

  const formatAddressToString = (address: any) => {
    return `${address.appartment ? address.appartment + ", " : ""}${address.street}, ${address.address}, ${address.postalCode}`;
  };

  const handleAddressChange = (addressId: string) => {
    const selectedAddress = addresses.find((addr) => addr.id === addressId);
    if (selectedAddress) {
      setSelectedAddressId(addressId);
      const formattedAddress = formatAddressToString(selectedAddress);
      setValue("address", formattedAddress);
    }
  };

  return (
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
          className="p-2 border border-gray-300 rounded0"
        />
        <input
          {...register("mobile")}
          type="tel"
          placeholder="Mobile"
          className="p-2 border border-gray-300 rounded"
        />

        <Select
          value={selectedAddressId}
          onValueChange={handleAddressChange}
        >
          <SelectTrigger className="">
            <SelectValue placeholder="Select an address" />
          </SelectTrigger>
          <SelectContent className="md:w-[90%] flex flex-col gap-3">
            {addresses.map((address, index) => (
              <div key={address.id}>
                <SelectItem value={address.id}>
                  {address.label} - {formatAddressToString(address)}
                </SelectItem>
                {index < addresses.length - 1 && <Separator />}
              </div>
            ))}
          </SelectContent>
        </Select>

        <textarea
          {...register("address")}
          placeholder="Address"
          className="p-2 border border-gray-300 rounded"
          value={watchedAddress}
          onChange={(e) => setValue("address", e.target.value)}
        />

        <Button type="submit" className="w-full">
          Place Order
        </Button>
      </div>
    </form>
  );
};

export default CheckoutForm;