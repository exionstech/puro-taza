// components/address/AddressModal.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Address, AddressInput, LabelType } from '@/types';
import { toast } from 'sonner';

const addressSchema = z.object({
  address: z.string().min(1, 'Address is required'),
  street: z.string().min(1, 'Street is required'),
  appartment: z.string(),
  postalCode: z.string().min(1, 'Postal code is required'),
  label: z.enum(['HOME', 'WORK', 'OTHER']),
  isDefault: z.boolean().optional(),
});

type FormData = z.infer<typeof addressSchema>;

interface AddressModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (data: AddressInput) => Promise<void>;
  initialData?: Partial<Address>;
  existingAddresses: Address[];
}

export const AddressModal: React.FC<AddressModalProps> = ({
  isOpen,
  onClose,
  onSubmit,
  initialData,
  existingAddresses,
}) => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(addressSchema),
    defaultValues: {
      address: initialData?.address || '',
      street: initialData?.street || '',
      appartment: initialData?.appartment || '',
      postalCode: initialData?.postalCode || '',
      label: initialData?.label || 'OTHER',
      isDefault: initialData?.isDefault,
    },
  });

  const handleFormSubmit = async (data: FormData) => {
    try {
      const addressInput: AddressInput = {
        ...data,
        isDefault: initialData?.isDefault || existingAddresses.length === 0,
      };
  
      await onSubmit(addressInput);
      reset();
      onClose();
      console.log('Address submitted:', addressInput);
    } catch (error) {
      console.error("Error submitting address:", error);
      toast.error("Failed to save address. Please try again.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>
            {initialData ? 'Edit Address' : 'Add New Address'}
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit(handleFormSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              {...register('address')}
              placeholder="Enter full address"
            />
            {errors.address && (
              <p className="text-red-500 text-sm">{errors.address.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="street">Street</Label>
            <Input
              id="street"
              {...register('street')}
              placeholder="Enter street name"
            />
            {errors.street && (
              <p className="text-red-500 text-sm">{errors.street.message}</p>
            )}
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="appartment">Apartment</Label>
              <Input
                id="appartment"
                {...register('appartment')}
                placeholder="Apartment number"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="postalCode">Postal Code</Label>
              <Input
                id="postalCode"
                {...register('postalCode')}
                placeholder="Enter postal code"
              />
              {errors.postalCode && (
                <p className="text-red-500 text-sm">{errors.postalCode.message}</p>
              )}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="label">Address Type</Label>
            <Select
              defaultValue={initialData?.label || 'OTHER'}
              onValueChange={(value: LabelType) => {
                register('label').onChange({
                  target: { value, name: 'label' },
                });
              }}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select a label" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="HOME">Home</SelectItem>
                <SelectItem value="WORK">Work</SelectItem>
                <SelectItem value="OTHER">Other</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit" disabled={isSubmitting}>
              {initialData ? 'Update' : 'Save'} Address
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddressModal;