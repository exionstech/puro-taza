"use client"
import React, { useState } from "react";
import { Plus, MapPin, LocateFixed } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Address, AddressInput, LocationFormData } from "@/types";
import { cn } from "@/lib/utils";
import { useAddressManagement } from "@/hooks/use-address";
import { GoogleMapModal } from "./google-map-modal";
import { AddressModal } from "./address-modal";
import { useAuth } from "@/hooks/use-auth";

interface AddressDropdownProps {
  onAddressSelect?: (address: Address) => void;
}

export const AddressDropdown = ({ onAddressSelect }: AddressDropdownProps) => {
  const { user } = useAuth();
  const clientId = user?.id ?? "";

  const {
    addresses,
    selectedAddress,
    addAddress,
    updateAddress,
    setSelectedAddress,
  } = useAddressManagement(clientId);

  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<Address | null>(null);

  const handleAddressSelect = (address: Address) => {
    setSelectedAddress(address);
    onAddressSelect?.(address);
  };

  const handleAddNewAddress = () => {
    setEditingAddress(null);
    setIsAddressModalOpen(true);
  };

  const handleAddressSubmit = async (data: AddressInput) => {
    if (editingAddress) {
      await updateAddress(editingAddress.id, data);
    } else {
      await addAddress(data);
    }
    setIsAddressModalOpen(false);
    setEditingAddress(null);
  };

  const handleMapAddressSelect = (locationData: LocationFormData) => {
    setIsMapModalOpen(false);

    const newAddress: AddressInput = {
      address: locationData.address,
      street: locationData.street,
      appartment: locationData.appartment || "",
      postalCode: locationData.postalCode,
      label: locationData.label || "OTHER",
      isDefault: addresses.length === 0,
    };

    setEditingAddress({
      ...newAddress,
      id: "",
      isDefault: addresses.length === 0,
      createdAt: new Date(),
      updatedAt: new Date(),
      latitude: locationData.latitude,
      longitude: locationData.longitude,
    });

    setIsAddressModalOpen(true);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild className="">
          <Button
            variant="outline"
            className="flex flex-col items-start border-none"
          >
            <h1 className="text-violet text-lg font-medium text-left">
              Select Address
            </h1>
            <p className="flex items-center">
              <span className="text-sm text-gray-600 line-clamp-1 max-w-[20vh] rounded-r-lg [mask-image:linear-gradient(to_right,transparent,black_0%,black_95%,transparent)]">
                {selectedAddress
                  ? selectedAddress.address
                  : "No address selected"}
              </span>
            </p>
          </Button>
        </DropdownMenuTrigger>

        <DropdownMenuContent className="w-[400px]">
          <DropdownMenuLabel className="font-bold text-lg">
            Select Delivery Address
          </DropdownMenuLabel>
          <h2 className="text-xs text-gray-500 px-2 pb-2">
            {addresses.length === 0
              ? "No saved addresses. Add your first address!"
              : "Choose from your saved addresses"}
          </h2>
          <DropdownMenuSeparator />

          {addresses.length > 0 && (
            <DropdownMenuGroup>
              {addresses.map((address) => (
                <DropdownMenuItem
                  key={address.id}
                  onSelect={() => handleAddressSelect(address)}
                  className={cn(
                    "cursor-pointer hover:bg-gray-100",
                    address.id === selectedAddress?.id &&
                      "bg-violet/10 border-r-[3px] border-violet"
                  )}
                >
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-violet" />
                    <div className="flex flex-col flex-1">
                      <p className="text-sm font-medium">{address.label}</p>
                      <p className="text-xs text-gray-500 line-clamp-1">
                        {address.appartment}, {address.street},{" "}
                        {address.address}
                      </p>
                    </div>
                    {address.id === selectedAddress?.id && (
                      <span className="text-xs bg-violet text-white px-2 py-1 rounded">
                        Selected
                      </span>
                    )}
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          )}

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onSelect={() => setIsMapModalOpen(true)}
            className={cn(
              "cursor-pointer hover:bg-gray-100",
              addresses.length >= 5 && "opacity-50 pointer-events-none"
            )}
          >
            <div className="flex items-center space-x-3">
              <LocateFixed className="w-5 h-5 text-blue-600" />
              <span className="text-blue-600">Use Current Location</span>
            </div>
          </DropdownMenuItem>

          <DropdownMenuItem
            onSelect={handleAddNewAddress}
            className={cn(
              "cursor-pointer hover:bg-gray-100",
              addresses.length >= 5 && "opacity-50 pointer-events-none"
            )}
          >
            <div className="flex items-center space-x-3">
              <Plus className="w-5 h-5 text-green-600" />
              <span className="text-green-600">
                {addresses.length < 5
                  ? "Add New Address"
                  : "Maximum Addresses Reached"}
              </span>
            </div>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      {isMapModalOpen && (
        <GoogleMapModal
          isOpen={isMapModalOpen}
          onClose={() => setIsMapModalOpen(false)}
          onAddressSelect={handleMapAddressSelect}
          googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || ""}
        />
      )}

      {isAddressModalOpen && (
        <AddressModal
          isOpen={isAddressModalOpen}
          onClose={() => {
            setIsAddressModalOpen(false);
            setEditingAddress(null);
          }}
          onSubmit={handleAddressSubmit}
          initialData={editingAddress || undefined}
          existingAddresses={addresses}
        />
      )}
    </>
  );
};

export default AddressDropdown;
