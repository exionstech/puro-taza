"use client";
import React, { useState, useRef, useEffect } from "react";
import { Address } from "@/types";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { MapPin, Loader2 } from "lucide-react";

interface GoogleMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddressSelect: (address: Address) => void;
}

const GoogleMapModal: React.FC<GoogleMapModalProps> = ({
  isOpen,
  onClose,
  onAddressSelect,
}) => {
  const [selectedLocation, setSelectedLocation] = useState<Address | null>(
    null
  );
  const [currentLocation, setCurrentLocation] = useState<{
    lat: number;
    lng: number;
  } | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const mapRef = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<google.maps.Map | null>(null);
  const markerInstance = useRef<google.maps.Marker | null>(null);
  const geocoderInstance = useRef<google.maps.Geocoder | null>(null);

  // Detect user's location with improved error handling
  useEffect(() => {
    if (isOpen) {
      setIsLoading(true);
      setError(null);

      // Check if geolocation is available
      if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const userLocation = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            setCurrentLocation(userLocation);
            setSelectedLocation({
              id: 0,
              address: "Current Location",
              latitude: userLocation.lat,
              longitude: userLocation.lng,
            });
            setIsLoading(false);
          },
          (positionError) => {
            // Fallback to a global default location
            const fallbackLocation = { lat: 37.0902, lng: -95.7129 };
            setCurrentLocation(fallbackLocation);
            setSelectedLocation({
              id: 0,
              address: "United States (Default Location)",
              latitude: fallbackLocation.lat,
              longitude: fallbackLocation.lng,
            });
            setIsLoading(false);

            // Set specific error messages
            switch (positionError.code) {
              case positionError.PERMISSION_DENIED:
                setError(
                  "Location access denied. Please enable location permissions."
                );
                break;
              case positionError.POSITION_UNAVAILABLE:
                setError("Location information is unavailable.");
                break;
              case positionError.TIMEOUT:
                setError("Location request timed out.");
                break;
              default:
                setError("Unable to detect your current location.");
            }
          },
          {
            enableHighAccuracy: true,
            timeout: 10000, // Increased timeout
            maximumAge: 30000, // Allow cached location for up to 30 seconds
          }
        );
      } else {
        // Fallback for browsers without geolocation
        const fallbackLocation = { lat: 37.0902, lng: -95.7129 };
        setCurrentLocation(fallbackLocation);
        setSelectedLocation({
          id: 0,
          address: "United States (Default Location)",
          latitude: fallbackLocation.lat,
          longitude: fallbackLocation.lng,
        });
        setError("Geolocation is not supported by this browser.");
        setIsLoading(false);
      }
    }
  }, [isOpen]);

  // Initialize Google Maps
  useEffect(() => {
    if (isOpen && currentLocation && !mapInstance.current) {
      // Dynamically load Google Maps script
      const script = document.createElement("script");
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.onload = initMap;
      document.body.appendChild(script);

      return () => {
        document.body.removeChild(script);
      };
    }
  }, [isOpen, currentLocation]);

  // Map Initialization
  const initMap = () => {
    if (mapRef.current && currentLocation) {
      // Initialize map
      mapInstance.current = new google.maps.Map(mapRef.current, {
        center: currentLocation,
        zoom: 15,
        mapTypeControl: false,
      });

      // Initialize geocoder
      geocoderInstance.current = new google.maps.Geocoder();

      // Create initial marker at current location
      markerInstance.current = new google.maps.Marker({
        position: currentLocation,
        map: mapInstance.current,
        draggable: true,
        title: "Drag to select location",
      });

      // Add search box
      const input = document.createElement("input");
      input.type = "text";
      input.placeholder = "Search for a location";
      input.className =
        "pac-input absolute z-10 top-2 left-2 w-64 p-2 bg-white border rounded";
      mapRef.current.appendChild(input);

      const searchBox = new google.maps.places.SearchBox(input);

      // Bias the SearchBox results towards current map's viewport
      mapInstance.current.addListener("bounds_changed", () => {
        searchBox.setBounds(
          mapInstance.current!.getBounds() as google.maps.LatLngBounds
        );
      });

      // Handle search box place selection
      searchBox.addListener("places_changed", () => {
        const places = searchBox.getPlaces();

        if (places && places.length > 0) {
          const place = places[0];
          if (!place.geometry || !place.geometry.location) {
            setError(
              "No details available for input: " +
                (place.name || "Unknown place")
            );
            return;
          }

          const location = place.geometry.location;
          const lat = location.lat();
          const lng = location.lng();

          // Update marker and map
          markerInstance.current!.setPosition({ lat, lng });
          mapInstance.current!.setCenter({ lat, lng });
          mapInstance.current!.setZoom(15);

          // Update selected location
          setSelectedLocation({
            id: 0,
            address: place.formatted_address || "Selected Location",
            latitude: lat,
            longitude: lng,
          });
        }
      });

      // Handle marker drag
      markerInstance.current.addListener("dragend", () => {
        const newPosition = markerInstance.current!.getPosition();
        if (newPosition && geocoderInstance.current) {
          geocoderInstance.current.geocode(
            { location: newPosition },
            (results, status) => {
              if (status === "OK" && results && results[0]) {
                setSelectedLocation({
                  id: 0,
                  address: results[0].formatted_address || "Selected Location",
                  latitude: newPosition.lat(),
                  longitude: newPosition.lng(),
                });
              }
            }
          );
        }
      });

      // Handle map click
      mapInstance.current.addListener(
        "click",
        (event: google.maps.MapMouseEvent) => {
          const clickedLocation = event.latLng;
          if (clickedLocation && geocoderInstance.current) {
            // Move marker
            markerInstance.current!.setPosition(clickedLocation);
            mapInstance.current!.setCenter(clickedLocation);

            // Geocode the location
            geocoderInstance.current.geocode(
              { location: clickedLocation },
              (results, status) => {
                if (status === "OK" && results && results[0]) {
                  setSelectedLocation({
                    id: 0,
                    address:
                      results[0].formatted_address || "Selected Location",
                    latitude: clickedLocation.lat(),
                    longitude: clickedLocation.lng(),
                  });
                }
              }
            );
          }
        }
      );
    }
  };

  // Handle location selection
  const handleSelectLocation = () => {
    if (selectedLocation) {
      onAddressSelect(selectedLocation);
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-full h-full md:max-w-[800px] md:h-[550px] 2xl:h-[600px] flex flex-col">
        <DialogHeader>
          <DialogTitle>Select Location on Map</DialogTitle>
        </DialogHeader>

        {isLoading ? (
          <div className="flex justify-center items-center h-full">
            <Loader2 className="mr-2 h-8 w-8 animate-spin" />
            <span>Detecting your location...</span>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center p-4">{error}</div>
        ) : (
          <div className="flex-grow relative">
            <div ref={mapRef} className="w-full h-full absolute top-0 left-0" />
          </div>
        )}

        {selectedLocation && (
          <div className="p-4 bg-gray-100 rounded-b-lg">
            <div className="flex items-center space-x-3 mb-4">
              <MapPin className="w-6 h-6 text-violet-500" />
              <div>
                <p className="text-sm text-gray-600">
                  {selectedLocation.address}
                </p>
                <p className="text-xs text-gray-500">
                  Latitude: {selectedLocation.latitude}, Longitude:{" "}
                  {selectedLocation.longitude}
                </p>
              </div>
            </div>
            <div className="flex justify-between">
              <Button variant="outline" onClick={onClose}>
                Cancel
              </Button>
              <Button
                onClick={handleSelectLocation}
                disabled={!selectedLocation}
              >
                Confirm Location
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default GoogleMapModal;
