"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useAddressManagement } from "@/hooks/use-address";
import { Address, AddressInput, User } from "@/types";
import { Plus, MapPin, Pencil, Trash2, Star, StarOff } from "lucide-react";
import { DeleteConfirmModal } from "./delete-address-modal";
import AddressModal from "@/components/shared/navbar/address-modal";
import { toast } from "sonner";

interface AddressProps {
  user: User;
}

const EditAddressSection = ({ user }: AddressProps) => {
  const {
    addresses,
    isLoading,
    deleteAddress,
    updateAddress,
    setDefaultAddress,
    addAddress,
  } = useAddressManagement(user?.id ?? "");

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedAddress, setSelectedAddress] = useState<Address | null>(null);

  const handleEditAddress = (address: Address) => {
    setSelectedAddress(address);
    setIsAddressModalOpen(true);
  };

  const handleDeleteClick = (address: Address) => {
    setSelectedAddress(address);
    setIsDeleteModalOpen(true);
  };

  const handleAddNewAddress = () => {
    setSelectedAddress(null);
    setIsAddressModalOpen(true);
  };

  const handleAddressSubmit = async (data: AddressInput) => {
    try {
      if (selectedAddress?.id) {
        await updateAddress(selectedAddress.id, data);
        toast.success("Address updated successfully");
      } else {
        const result = await addAddress(data);
        if (result) {
          toast.success("Address added successfully");
        }
      }
      setIsAddressModalOpen(false);
      setSelectedAddress(null);
    } catch (error) {
      toast.error("Failed to save address");
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>My Addresses</CardTitle>
        <Button
          onClick={handleAddNewAddress}
          className="flex items-center gap-2"
          disabled={addresses.length >= 5}
        >
          <Plus className="w-4 h-4" />
          {addresses.length >= 5 ? "Address Limit Reached" : "Add New Address"}
        </Button>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="text-center h-[250px] py-8">Loading addresses...</div>
        ) : addresses.length === 0 ? (
          <div className="text-center h-[250px] py-8 text-gray-500">
            You haven't added any addresses yet.
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {addresses.map((address) => (
              <div
                key={address.id}
                className="p-4 border rounded-lg relative hover:border-violet"
              >
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-5 h-5 text-violet" />
                    <span className="font-medium">{address.label}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => setDefaultAddress(address.id)}
                      title={
                        address.isDefault ? "Default address" : "Set as default"
                      }
                    >
                      {address.isDefault ? (
                        <Star className="w-4 h-4 text-yellow-500" />
                      ) : (
                        <StarOff className="w-4 h-4" />
                      )}
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleEditAddress(address)}
                    >
                      <Pencil className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDeleteClick(address)}
                      disabled={address.isDefault}
                      title={
                        address.isDefault
                          ? "Cannot delete default address"
                          : "Delete address"
                      }
                    >
                      <Trash2 className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>
                    {address.appartment && `${address.appartment}, `}
                    {address.street}
                  </p>
                  <p>{address.address}</p>
                  <p>Postal Code: {address.postalCode}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>

      {isAddressModalOpen && (
        <AddressModal
          isOpen={isAddressModalOpen}
          onClose={() => {
            setIsAddressModalOpen(false);
            setSelectedAddress(null);
          }}
          initialData={selectedAddress || undefined}
          existingAddresses={addresses}
          onSubmit={handleAddressSubmit}
        />
      )}

      {isDeleteModalOpen && selectedAddress && (
        <DeleteConfirmModal
          isOpen={isDeleteModalOpen}
          onClose={() => {
            setIsDeleteModalOpen(false);
            setSelectedAddress(null);
          }}
          onConfirm={async () => {
            if (selectedAddress) {
              const success = await deleteAddress(selectedAddress.id);
              if (success) {
                toast.success("Address deleted successfully");
              }
            }
          }}
          address={selectedAddress}
        />
      )}
    </Card>
  );
};

export default EditAddressSection;