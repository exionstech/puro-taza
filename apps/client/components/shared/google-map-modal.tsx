"use client"
import React, { useState, useEffect } from 'react';
import { Address } from '@/types';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin } from 'lucide-react';

interface GoogleMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddressSelect: (address: Address) => void;
}

const GoogleMapModal: React.FC<GoogleMapModalProps> = ({ 
  isOpen, 
  onClose, 
  onAddressSelect 
}) => {
  const [currentLocation, setCurrentLocation] = useState<Address | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (isOpen) {
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          async (position) => {
            try {
              const response = await fetch(
                `https://nominatim.openstreetmap.org/reverse?format=json&lat=${position.coords.latitude}&lon=${position.coords.longitude}`
              );
              const data = await response.json();

              setCurrentLocation({
                id: 0,
                name: 'Current Location',
                address: data.display_name || 'Unnamed Location',
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              });
            } catch (geocodingError) {
              setError('Unable to retrieve address information');
            }
          },
          (positionError) => {
            switch(positionError.code) {
              case positionError.PERMISSION_DENIED:
                setError("Location access denied. Please enable location permissions.");
                break;
              case positionError.POSITION_UNAVAILABLE:
                setError("Location information is unavailable.");
                break;
              case positionError.TIMEOUT:
                setError("Location request timed out.");
                break;
              default:
                setError("An unknown error occurred.");
            }
          }
        );
      } else {
        setError("Geolocation is not supported by this browser.");
      }
    }
  }, [isOpen]);

  const handleSelectLocation = () => {
    if (currentLocation) {
      onAddressSelect(currentLocation);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Select Current Location</DialogTitle>
        </DialogHeader>
        
        {error ? (
          <div className="text-red-500 text-center p-4">
            {error}
          </div>
        ) : currentLocation ? (
          <div className="p-4">
            <div className="flex items-center space-x-3 mb-4">
              <MapPin className="w-6 h-6 text-violet" />
              <div>
                <h2 className="font-medium text-lg">{currentLocation.name}</h2>
                <p className="text-sm text-gray-600">{currentLocation.address}</p>
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button onClick={handleSelectLocation}>
                Confirm Location
              </Button>
            </div>
          </div>
        ) : (
          <div className="text-center p-4">
            Fetching your current location...
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GoogleMapModal;