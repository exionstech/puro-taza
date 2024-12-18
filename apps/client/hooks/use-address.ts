import { useState, useEffect, useCallback } from 'react';
import { Address, AddressInput } from '@/types';
import { toast } from 'sonner';

// Unique storage key with user-specific prefix (replace with actual user ID in production)
const generateStorageKey = (userId: string) => `savedAddresses_${userId}`;

export const useAddressManagement = (userId: string) => {
  const [addresses, setAddresses] = useState<Address[]>(() => {
    // Initialize addresses from localStorage with user-specific key
    if (typeof window !== 'undefined') {
      const savedAddresses = localStorage.getItem(generateStorageKey(userId));
      return savedAddresses ? JSON.parse(savedAddresses) : [];
    }
    return [];
  });

  const [selectedAddress, setSelectedAddress] = useState<Address | null>(
    addresses.find(addr => addr.isDefault) || addresses[0] || null
  );

  // Save addresses to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(
        generateStorageKey(userId), 
        JSON.stringify(addresses)
      );

      // Update selected address if current selection is no longer in the list
      if (
        selectedAddress && 
        !addresses.some(addr => addr.id === selectedAddress.id)
      ) {
        setSelectedAddress(addresses[0] || null);
      }
    }
  }, [addresses, userId]);

  // Add new address
  const addAddress = useCallback((newAddress: AddressInput) => {
    if (addresses.length >= 5) {
      toast.message("You can only add up to 4 addresses.");
      return null;
    }

    const newAddressWithId: Address = {
      ...newAddress,
      id: addresses.length > 0 
        ? Math.max(...addresses.map((a) => a.id)) + 1 
        : 1,
      isDefault: addresses.length === 0,
    };

    const updatedAddresses = [...addresses, newAddressWithId];
    
    // If this is the first address, set it as default
    if (updatedAddresses.length === 1) {
      newAddressWithId.isDefault = true;
    }

    setAddresses(updatedAddresses);
    setSelectedAddress(newAddressWithId);
    
    toast.success("Address added successfully");
    return newAddressWithId;
  }, [addresses]);

  // Update existing address
  const updateAddress = useCallback((updatedAddress: Address) => {
    const updatedAddresses = addresses.map(addr => 
      addr.id === updatedAddress.id ? updatedAddress : addr
    );

    setAddresses(updatedAddresses);
    
    // If updating the selected address, update selection
    if (selectedAddress?.id === updatedAddress.id) {
      setSelectedAddress(updatedAddress);
    }

    toast.success("Address updated successfully");
    return updatedAddress;
  }, [addresses, selectedAddress]);

  // Delete address
  const deleteAddress = useCallback((addressId: number) => {
    const updatedAddresses = addresses.filter(addr => addr.id !== addressId);
    
    setAddresses(updatedAddresses);

    // If deleting the selected address, select another or set to null
    if (selectedAddress?.id === addressId) {
      setSelectedAddress(updatedAddresses[0] || null);
    }

    toast.success("Address deleted successfully");
    return updatedAddresses;
  }, [addresses, selectedAddress]);

  // Set default address
  const setDefaultAddress = useCallback((addressId: number) => {
    const updatedAddresses = addresses.map(addr => ({
      ...addr,
      isDefault: addr.id === addressId
    }));

    setAddresses(updatedAddresses);
    setSelectedAddress(
      updatedAddresses.find(addr => addr.id === addressId) || null
    );

    toast.success("Default address updated");
    return updatedAddresses;
  }, [addresses]);

  // Check if an address already exists based on latitude and longitude
  const isAddressExists = useCallback((latitude?: number, longitude?: number) => {
    return addresses.some(
      addr => 
        addr.latitude === latitude && 
        addr.longitude === longitude
    );
  }, [addresses]);

  return {
    addresses,
    selectedAddress,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    isAddressExists,
    setSelectedAddress
  };
};