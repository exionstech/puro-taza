"use client"
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AddressInput } from '@/types';
import { addressSchema } from '@/schemas';


// Infer the type from the Zod schema
type AddressFormData = z.infer<typeof addressSchema>;

interface AddAddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddAddress: (address: AddressInput) => void;
}

const AddAddressModal: React.FC<AddAddressModalProps> = ({ 
  isOpen, 
  onClose, 
  onAddAddress 
}) => {
  const { 
    register, 
    handleSubmit, 
    formState: { errors },
    reset 
  } = useForm<AddressFormData>({
    resolver: zodResolver(addressSchema)
  });

  const onSubmit = (data: AddressFormData) => {
    // Combine address details
    const fullAddress = `${data.houseNo}, ${data.street}, ${data.district}, ${data.pinCode}`;

    // Log to console
    console.log('New Address:', {
      name: data.name,
      address: fullAddress,
      mobileNo: data.mobileNo
    });

    // Call onAddAddress with the new address
    onAddAddress({
      name: data.name,
      address: fullAddress,
      mobileNo: data.mobileNo
    });

    // Reset form and close modal
    reset();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add New Address</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 p-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Full Name</Label>
              <Input
                id="name"
                placeholder="Enter full name"
                {...register('name')}
              />
              {errors.name && (
                <p className="text-red-500 text-sm">{errors.name.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="mobileNo">Mobile Number</Label>
              <Input
                id="mobileNo"
                type="tel"
                placeholder="Enter mobile number"
                {...register('mobileNo')}
              />
              {errors.mobileNo && (
                <p className="text-red-500 text-sm">{errors.mobileNo.message}</p>
              )}
            </div>
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="houseNo">House/Flat Number</Label>
            <Input
              id="houseNo"
              placeholder="Enter house/flat number"
              {...register('houseNo')}
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
              {...register('street')}
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
                {...register('district')}
              />
              {errors.district && (
                <p className="text-red-500 text-sm">{errors.district.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label htmlFor="pinCode">Pin Code</Label>
              <Input
                id="pinCode"
                placeholder="Enter pin code"
                {...register('pinCode')}
              />
              {errors.pinCode && (
                <p className="text-red-500 text-sm">{errors.pinCode.message}</p>
              )}
            </div>
          </div>
          
          <div className="flex justify-between mt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Save Address
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddAddressModal;