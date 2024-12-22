import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import {
  Address,
  AddressInput,
  ApiResponse,
} from "@/types";

interface AddressApiResponse {
  success: boolean;
  addresses?: Address | Address[];
  message?: string;
}

export const useAddressManagement = (clientId: string) => {
  const [addresses, setAddresses] = useState<Address[]>([]);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      if (!clientId) {
        setIsLoading(false);
        return;
      }

      try {
        setIsLoading(true);
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/client/${clientId}/address`
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: AddressApiResponse = await response.json();

        if (data.success && data.addresses && Array.isArray(data.addresses)) {
          setAddresses(data.addresses);
          const defaultAddress = data.addresses.find(
            (addr: Address) => addr.isDefault
          );
          setSelectedAddress(defaultAddress || data.addresses[0] || null);
        } else {
          throw new Error("Invalid data format received from API");
        }
      } catch (error) {
        console.error("Error fetching addresses:", error);
        toast.error("Failed to fetch addresses. Please try again later.");
        setAddresses([]);
        setSelectedAddress(null);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAddresses();
  }, [clientId]);

  // Add address
  const addAddress = useCallback(
    async (newAddress: AddressInput): Promise<boolean> => {
      if (addresses.length >= 5) {
        toast.error("Maximum limit of 5 addresses reached");
        return false;
      }

      try {
        // If this is the first address or marked as default, ensure it's set as default
        const shouldBeDefault = addresses.length === 0 || newAddress.isDefault;
        
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/client/${clientId}/address`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...newAddress,
              isDefault: shouldBeDefault,
              label: newAddress.label || "Home",
            }),
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: AddressApiResponse = await response.json();

        if (data.success) {
          // Refresh the addresses list
          const fetchResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/client/${clientId}/address`
          );
          const fetchData: AddressApiResponse = await fetchResponse.json();
          
          if (fetchData.success && fetchData.addresses && Array.isArray(fetchData.addresses)) {
            setAddresses(fetchData.addresses);
            if (shouldBeDefault) {
              toast.success("New default address set successfully");
            }
          }
          return true;
        }
        return false;
      } catch (error) {
        console.error("Error adding address:", error);
        throw error;
      }
    },
    [addresses, clientId]
  );

  // Update address
  const updateAddress = useCallback(
    async (
      addressId: string,
      updatedAddress: AddressInput
    ): Promise<Address | null> => {
      try {
        // If setting as default, first remove default from other addresses
        if (updatedAddress.isDefault) {
          const currentDefault = addresses.find(addr => addr.isDefault && addr.id !== addressId);
          if (currentDefault) {
            await fetch(
              `${process.env.NEXT_PUBLIC_API_URL}/client/${clientId}/address/${currentDefault.id}`,
              {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ ...currentDefault, isDefault: false }),
              }
            );
          }
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/client/${clientId}/address/${addressId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(updatedAddress),
          }
        );

        const data: AddressApiResponse = await response.json();

        if (data.success) {
          const fetchResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/client/${clientId}/address`
          );
          const fetchData: AddressApiResponse = await fetchResponse.json();

          if (
            fetchData.success &&
            fetchData.addresses &&
            Array.isArray(fetchData.addresses)
          ) {
            setAddresses(fetchData.addresses);
            const updated = fetchData.addresses.find(
              (addr: Address) => addr.id === addressId
            );

            if (selectedAddress?.id === addressId) {
              setSelectedAddress(updated || null);
            }

            if (updatedAddress.isDefault) {
              toast.success("Default address updated successfully");
            }

            if (updated) {
              return updated;
            }
          }
        }
        return null;
      } catch (error) {
        toast.error("Failed to update address");
        console.error("Error updating address:", error);
        return null;
      }
    },
    [clientId, selectedAddress, addresses]
  );

  // Set default address
  const setDefaultAddress = useCallback(
    async (addressId: string): Promise<boolean> => {
      try {
        const newDefaultAddress = addresses.find(addr => addr.id === addressId);
        if (!newDefaultAddress) return false;

        // Remove default from current default address
        const currentDefault = addresses.find(addr => addr.isDefault);
        if (currentDefault && currentDefault.id !== addressId) {
          await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/client/${clientId}/address/${currentDefault.id}`,
            {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ ...currentDefault, isDefault: false }),
            }
          );
        }

        // Set new default address
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/client/${clientId}/address/${addressId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...newDefaultAddress, isDefault: true }),
          }
        );

        const data: AddressApiResponse = await response.json();

        if (data.success) {
          const fetchResponse = await fetch(
            `${process.env.NEXT_PUBLIC_API_URL}/client/${clientId}/address`
          );
          const fetchData: AddressApiResponse = await fetchResponse.json();

          if (
            fetchData.success &&
            fetchData.addresses &&
            Array.isArray(fetchData.addresses)
          ) {
            setAddresses(fetchData.addresses);
            const updated = fetchData.addresses.find(addr => addr.id === addressId);
            setSelectedAddress(updated || null);
            toast.success("Default address updated successfully");
          }
          return true;
        }
        return false;
      } catch (error) {
        toast.error("Failed to set default address");
        console.error("Error setting default address:", error);
        return false;
      }
    },
    [addresses, clientId]
  );

  // Delete address
  const deleteAddress = useCallback(
    async (addressId: string): Promise<boolean> => {
      try {
        const addressToDelete = addresses.find(addr => addr.id === addressId);
        
        if (!addressToDelete) {
          toast.error("Address not found");
          return false;
        }

        if (addressToDelete.isDefault) {
          toast.error("Cannot delete default address");
          return false;
        }

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/client/${clientId}/address/${addressId}`,
          {
            method: "DELETE",
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: ApiResponse<void> = await response.json();

        if (data.success) {
          setAddresses(prev => prev.filter(addr => addr.id !== addressId));
          if (selectedAddress?.id === addressId) {
            const defaultAddress = addresses.find(addr => addr.isDefault);
            setSelectedAddress(defaultAddress || addresses[0] || null);
          }
          return true;
        }
        return false;
      } catch (error) {
        console.error("Error deleting address:", error);
        throw error;
      }
    },
    [addresses, clientId, selectedAddress]
  );

  return {
    addresses,
    selectedAddress,
    isLoading,
    addAddress,
    updateAddress,
    deleteAddress,
    setDefaultAddress,
    setSelectedAddress,
  };
};