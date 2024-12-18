"use client";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Address, AddressInput } from "@/types";
import { addressSchema } from "@/schemas";

type AddressFormData = z.infer<typeof addressSchema> & {
  nickname: string;
};

interface AddAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAddress: (address: AddressInput) => void;
  initialData?: Partial<Address>;
}

const AddAddressModal = ({
  isOpen,
  onClose,
  onAddAddress,
  initialData,
}: AddAddressModalProps) => {

  const parseAddressParts = (address?: string) => {
    if (!address) return {
      houseNo: '',
      street: '',
      district: '',
      pinCode: ''
    };

    const parts = address.split(',').map(part => part.trim());

    const parsedAddress = {
      houseNo: '',
      street: '',
      district: '',
      pinCode: ''
    };

    const pinCodeMatch = address.match(/\b\d{5,6}\b/);
    if (pinCodeMatch) {
      parsedAddress.pinCode = pinCodeMatch[0];
    }

    if (parts.length > 1) {
      if (parts.length >= 2) {
        parsedAddress.district = parts[parts.length - 2];
      }

      const streetParts = parts.slice(0, Math.min(2, parts.length - 2));
      parsedAddress.street = streetParts.join(', ');

      const houseNoMatch = parts[0].match(/^\d+\s*(?:[-/]?\w+)?/);
      if (houseNoMatch) {
        parsedAddress.houseNo = houseNoMatch[0];
      }
    }

    return parsedAddress;
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: initialData,
  });

  // Effect to set form values when initialData changes
  useEffect(() => {
    if (initialData?.address) {
      const { houseNo, street, district, pinCode } = parseAddressParts(initialData.address);
      
      setValue('houseNo', houseNo);
      setValue('street', street);
      setValue('district', district);
      setValue('pinCode', pinCode);
    }
  }, [initialData, setValue]);

  const onSubmit = (data: AddressFormData) => {
    const fullAddress = `${data.houseNo}, ${data.street}, ${data.district}, ${data.pinCode}`;

    const addressToSubmit: AddressInput = {
      address: fullAddress,
      latitude: initialData?.latitude,
      longitude: initialData?.longitude,
      isDefault: initialData?.isDefault,
      nickname: data.nickname
    };

    onAddAddress(addressToSubmit);
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? "Edit Address" : "Add New Address"}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
          <div className="space-y-2">
            <Label htmlFor="houseNo">House/Flat Number</Label>
            <Input
              id="houseNo"
              placeholder="Enter house/flat number"
              {...register("houseNo")}
            />
            {errors.houseNo && (
              <p className="text-red-500 text-sm">{errors.houseNo.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="street">Street/Locality</Label>
            <Input
              id="street"
              placeholder="Enter street or locality"
              {...register("street")}
            />
            {errors.street && (
              <p className="text-red-500 text-sm">{errors.street.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="district">District</Label>
              <Input
                id="district"
                placeholder="Enter district"
                {...register("district")}
              />
              {errors.district && (
                <p className="text-red-500 text-sm">
                  {errors.district.message}
                </p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="pinCode">Pin Code</Label>
              <Input
                id="pinCode"
                placeholder="Enter pin code"
                {...register("pinCode")}
              />
              {errors.pinCode && (
                <p className="text-red-500 text-sm">{errors.pinCode.message}</p>
              )}
            </div>
            <div className="col-span-2 space-y-2">
              <Label htmlFor="nickname">Address Nickname (Optional)</Label>
              <Input
                id="nickname"
                placeholder="Home, Work, etc."
                {...register("nickname")}
              />
            </div>
          </div>

          <div className="flex justify-between mt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              {initialData ? "Update Address" : "Save Address"}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAddressModal;