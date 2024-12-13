"use client"
import React, { useState } from 'react';
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
import { Plus, MapPin, LocateFixed } from 'lucide-react';
import GoogleMapModal from '@/components/shared/google-map-modal';

interface Address {
  id: number | undefined;
  name: string;
  address: string;
  isDefault?: boolean;
  latitude?: number;
  longitude?: number;
}

const AddressDropdown: React.FC = () => {
  const [addresses, setAddresses] = useState<Address[]>([
    {
      id: 1,
      name: 'Suman Mandal',
      address: '62, BM Banerjee Lane, Kolkata',
      isDefault: true
    },
    {
      id: 2,
      name: 'Office Address',
      address: '123, Business Park, Salt Lake',
    },
    {
      id: 3,
      name: 'Relatives Address',
      address: '45, Park Street, Kolkata',
    }
  ]);

  const [selectedAddress, setSelectedAddress] = useState<Address>(
    addresses.find(addr => addr.isDefault) || addresses[0]
  );

  const [isMapModalOpen, setIsMapModalOpen] = useState(false);

  const handleAddressSelect = (address: Address) => {
    setSelectedAddress(address);
  };

  const handleAddNewAddress = () => {
    alert('Add New Address functionality to be implemented');
  };

  const handleCurrentLocation = () => {
    setIsMapModalOpen(true);
  };

  const handleMapAddressSelect = (selectedLocationAddress: Address) => {
    // Check if address already exists
    const existingAddress = addresses.find(
      addr => 
        addr.latitude === selectedLocationAddress.latitude && 
        addr.longitude === selectedLocationAddress.longitude
    );

    if (!existingAddress) {
      // Create a new address with a unique ID
      const newAddress: Address = {
        ...selectedLocationAddress,
        id: addresses.length + 1
      };

      // Add new address to the list
      setAddresses(prev => [...prev, newAddress]);
      setSelectedAddress(newAddress);
    } else {
      // Select existing address
      setSelectedAddress(existingAddress);
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
              {selectedAddress.name}
            </h1>
            <p className="flex items-center">
              <span className="text-sm text-gray-600 line-clamp-1 max-w-[20vh]">
                {selectedAddress.address}
              </span>
              <DropdownIcon size={3} className="ml-3"/>
            </p>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-[350px]">
          <DropdownMenuLabel className="font-bold text-lg">
            Select Delivery Address
          </DropdownMenuLabel>
          <h2 className="text-xs text-gray-500 px-2 pb-2">
            Choose from your saved addresses
          </h2>
          <DropdownMenuSeparator />
          
          <DropdownMenuGroup>
            {addresses.map((address) => (
              <DropdownMenuItem 
                key={address.id}
                onSelect={() => handleAddressSelect(address)}
                className={`cursor-pointer ${
                  selectedAddress.id === address.id 
                    ? 'bg-violet/10 text-violet' 
                    : 'hover:bg-gray-100'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center space-x-3">
                    <MapPin className="w-5 h-5 text-violet" />
                    <div>
                      <h1 className="font-medium">{address.name}</h1>
                      <p className="text-sm text-gray-500 line-clamp-1">
                        {address.address}
                      </p>
                    </div>
                  </div>
                  {selectedAddress.id === address.id && (
                    <span className="text-xs bg-violet text-white px-2 py-1 rounded-full">
                      Selected
                    </span>
                  )}
                </div>
              </DropdownMenuItem>
            ))}
          </DropdownMenuGroup>
          
          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            onSelect={handleCurrentLocation}
            className="cursor-pointer hover:bg-gray-100"
          >
            <div className="flex items-center space-x-3">
              <LocateFixed className="w-5 h-5 text-blue-600" />
              <span className="text-blue-600">Use Current Location</span>
            </div>
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          
          <DropdownMenuItem 
            onSelect={handleAddNewAddress}
            className="cursor-pointer hover:bg-gray-100"
          >
            <div className="flex items-center space-x-3">
              <Plus className="w-5 h-5 text-green-600" />
              <span className="text-green-600">Add New Address</span>
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
    </>
  );
};

export default AddressDropdown;