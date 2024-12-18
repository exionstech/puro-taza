"use client";
import React, { useState } from "react";
import DropdownIcon from "@/components/shared/dropdown-icon";
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
import { Plus, MapPin, LocateFixed } from "lucide-react";
import GoogleMapModal from "@/components/shared/navbar/google-map-modal";
import { Address, AddressInput } from "@/types";
import AddAddressModal from "./address-modal";
import { cn } from "@/lib/utils";
import { useAddressManagement } from "@/hooks/use-address";
import { useUser } from "@/hooks/user";

const AddressDropdown = () => {

  const { user } = useUser();
  const userId = user?.id || "guest";

  const {
    addresses,
    selectedAddress,
    addAddress,
    setSelectedAddress,
    isAddressExists,
  } = useAddressManagement(userId);

  const [isMapModalOpen, setIsMapModalOpen] = useState(false);
  const [isAddAddressModalOpen, setIsAddAddressModalOpen] = useState(false);
  const [pendingLocationAddress, setPendingLocationAddress] =
    useState<Address | null>(null);

  const handleAddressSelect = (address: Address) => {
    setSelectedAddress(address);
  };

  const handleAddNewAddress = () => {
    setIsAddAddressModalOpen(true);
  };

  const handleCurrentLocation = () => {
    setIsMapModalOpen(true);
  };

  const handleAddAddress = (newAddress: AddressInput) => {
    addAddress(newAddress);
    setIsAddAddressModalOpen(false);
    setPendingLocationAddress(null);
  };

  const handleMapAddressSelect = (selectedLocationAddress: Address) => {
    // Check if address already exists
    if (
      isAddressExists(
        selectedLocationAddress.latitude,
        selectedLocationAddress.longitude
      )
    ) {
      // If exists, just select the existing address
      const existingAddress = addresses.find(
        (addr) =>
          addr.latitude === selectedLocationAddress.latitude &&
          addr.longitude === selectedLocationAddress.longitude
      );

      if (existingAddress) {
        setSelectedAddress(existingAddress);
      }
    } else {
      // Open address modal with location details for user to confirm/edit
      setPendingLocationAddress(selectedLocationAddress);
      setIsAddAddressModalOpen(true);
    }

    setIsMapModalOpen(false);
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            variant="outline"
            className="flex flex-col border-none items-start dropdown-button"
          >
            <h1 className="text-violet text-lg font-medium w-full text-left">
              Select Address
            </h1>
            <p className="flex items-center">
              <span className="text-sm text-gray-600 line-clamp-1 max-w-[20vh] rounded-r-lg [mask-image:linear-gradient(to_right,transparent,black_0%,black_95%,transparent)]">
                {selectedAddress ? selectedAddress.address : "No address added"}
              </span>
              <DropdownIcon size={3} className="ml-3" />
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
                    <div className="flex justify-between">
                      <p className="text-sm text-gray-500 line-clamp-1">
                        {address.address}
                      </p>
                      {address.id === selectedAddress?.id && (
                        <p className="text-xs text-center text-white bg-violet px-2 py-1 rounded-lg">
                          Selected
                        </p>
                      )}
                    </div>
                  </div>
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          )}

          <DropdownMenuSeparator />

          <DropdownMenuItem
            onSelect={handleCurrentLocation}
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

          <DropdownMenuSeparator />

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
        />
      )}

      {isAddAddressModalOpen && (
        <AddAddressModal
          isOpen={isAddAddressModalOpen}
          onClose={() => {
            setIsAddAddressModalOpen(false);
            setPendingLocationAddress(null);
          }}
          onAddAddress={handleAddAddress}
          initialData={
            pendingLocationAddress
              ? {
                  ...pendingLocationAddress,
                  address: pendingLocationAddress.address || "",
                }
              : undefined
          }
        />
      )}
    </>
  );
};

export default AddressDropdown;
