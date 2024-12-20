import { useState, useCallback, useEffect } from "react";
import { toast } from "sonner";
import {
  Address,
  AddressInput,
  ApiResponse,
  LocationFormData,
  LabelType,
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
    async (newAddress: AddressInput): Promise<Address | null> => {
      if (addresses.length >= 5) {
        toast.error("Maximum limit of 5 addresses reached");
        return null;
      }

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/client/${clientId}/address`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...newAddress,
              isDefault: addresses.length === 0 || newAddress.isDefault,
              label: newAddress.label,
            }),
          }
        );

        const data: AddressApiResponse = await response.json();

        if (data.success && data.addresses && !Array.isArray(data.addresses)) {
          const addedAddress = data.addresses;
          setAddresses((prev) => [...prev, addedAddress]);

          if (addresses.length === 0 || addedAddress.isDefault) {
            setSelectedAddress(addedAddress);
          }

          toast.success("Address added successfully");
          return addedAddress;
        }
        return null;
      } catch (error) {
        toast.error("Failed to add address");
        console.error("Error adding address:", error);
        return null;
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
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/client/${clientId}/address`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              ...updatedAddress,
              label: updatedAddress.label,
            }),
          }
        );

        const data: AddressApiResponse = await response.json();

        if (data.success) {
          // Fetch the updated addresses since the API doesn't return the updated address
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
    [clientId, selectedAddress]
  );

  // Delete address
  const deleteAddress = useCallback(
    async (addressId: string): Promise<boolean> => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/client/${clientId}/address/${addressId}`,
          {
            method: "DELETE",
          }
        );

        const data: ApiResponse<void> = await response.json();

        if (data.success) {
          setAddresses((prev) =>
            prev.filter((addr: Address) => addr.id !== addressId)
          );

          if (selectedAddress?.id === addressId) {
            const remaining = addresses.filter(
              (addr: Address) => addr.id !== addressId
            );
            setSelectedAddress(remaining[0] || null);
          }

          toast.success("Address deleted successfully");
          return true;
        }
        return false;
      } catch (error) {
        toast.error("Failed to delete address");
        console.error("Error deleting address:", error);
        return false;
      }
    },
    [addresses, clientId, selectedAddress]
  );

  // Set default address
  const setDefaultAddress = useCallback(
    async (addressId: string): Promise<boolean> => {
      try {
        const address = addresses.find(
          (addr: Address) => addr.id === addressId
        );
        if (!address) return false;

        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_URL}/client/${clientId}/address/${addressId}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ ...address, isDefault: true }),
          }
        );

        const data: AddressApiResponse = await response.json();

        if (data.success) {
          // Fetch the updated addresses since the API doesn't return the updated address
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
            setSelectedAddress(updated || null);
          }

          toast.success("Default address updated");
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
