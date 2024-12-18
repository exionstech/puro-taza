import { useState, useEffect, useCallback } from 'react';
import { Address, AddressInput } from '@/types';
import { toast } from 'sonner';

// Interface for hook return type
interface UseAddressHook {
  addresses: Address[];
  selectedAddress: Address | null;
  addAddress: (newAddress: AddressInput) => void;
  updateAddress: (id: number, updatedAddress: AddressInput) => void;
  deleteAddress: (id: number) => void;
  selectAddress: (id: number) => void;
  clearAddresses: () => void;
}

// Helper function to generate a unique user identifier
const generateUserIdentifier = () => {
  // In a real application, this would come from authentication
  // For now, we'll use a simple method to simulate user-specific storage
  if (typeof window !== 'undefined') {
    const storedUserId = localStorage.getItem('userId');
    if (storedUserId) return storedUserId;

    const newUserId = `user_${Math.random().toString(36).substr(2, 9)}`;
    localStorage.setItem('userId', newUserId);
    return newUserId;
  }
  return 'anonymous_user';
};

export const useAddressManager = (): UseAddressHook => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const userId = generateUserIdentifier();

  // Load addresses from localStorage on hook initialization
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storageKey = `savedAddresses_${userId}`;
      const savedAddresses = localStorage.getItem(storageKey);
      
      if (savedAddresses) {
        const parsedAddresses = JSON.parse(savedAddresses);
        setAddresses(parsedAddresses);
        
        // Set first address as selected if exists
        if (parsedAddresses.length > 0) {
          setSelectedAddress(parsedAddresses[0]);
        }
      }
    }
  }, [userId]);

  // Save addresses to localStorage whenever they change
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storageKey = `savedAddresses_${userId}`;
      localStorage.setItem(storageKey, JSON.stringify(addresses));
    }
  }, [addresses, userId]);

  // Add a new address
  const addAddress = useCallback((newAddress: AddressInput) => {
    if (addresses.length >= 5) {
      toast.error("You can only add up to 4 addresses.");
      return;
    }

    const newAddressWithId: Address = {
      ...newAddress,
      id: addresses.length > 0 ? Math.max(...addresses.map((a) => a.id)) + 1 : 1,
      isDefault: addresses.length === 0,
    };

    const updatedAddresses = [...addresses, newAddressWithId];
    setAddresses(updatedAddresses);
    
    // Automatically select the new address if it's the first one
    if (updatedAddresses.length === 1) {
      setSelectedAddress(newAddressWithId);
    }

    toast.success("Address added successfully");
    return newAddressWithId;
  }, [addresses]);

  // Update an existing address
  const updateAddress = useCallback((id: number, updatedAddress: AddressInput) => {
    const updatedAddresses = addresses.map(addr => 
      addr.id === id 
        ? { ...addr, ...updatedAddress } 
        : addr
    );

    setAddresses(updatedAddresses);
    
    // Update selected address if the updated address is the current selected one
    if (selectedAddress?.id === id) {
      setSelectedAddress(updatedAddresses.find(addr => addr.id === id) || null);
    }

    toast.success("Address updated successfully");
  }, [addresses, selectedAddress]);

  // Delete an address
  const deleteAddress = useCallback((id: number) => {
    const updatedAddresses = addresses.filter(addr => addr.id !== id);
    setAddresses(updatedAddresses);

    // If the deleted address was selected, select the first address or null
    if (selectedAddress?.id === id) {
      setSelectedAddress(updatedAddresses.length > 0 ? updatedAddresses[0] : null);
    }

    toast.success("Address deleted successfully");
  }, [addresses, selectedAddress]);

  // Select an address
  const selectAddress = useCallback((id: number) => {
    const addressToSelect = addresses.find(addr => addr.id === id);
    if (addressToSelect) {
      setSelectedAddress(addressToSelect);
    }
  }, [addresses]);

  // Clear all addresses
  const clearAddresses = useCallback(() => {
    setAddresses([]);
    setSelectedAddress(null);
    toast.success("All addresses cleared");
  }, []);

  return {
    addresses,
    selectedAddress,
    addAddress,
    updateAddress,
    deleteAddress,
    selectAddress,
    clearAddresses
  };
};