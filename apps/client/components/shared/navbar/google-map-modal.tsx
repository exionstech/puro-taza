import React, { useState, useCallback, useEffect, useRef } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { LocationFormData } from "@/types";
import {
  GoogleMap,
  StandaloneSearchBox,
  useJsApiLoader,
  LoadScriptProps,
} from "@react-google-maps/api";

interface GoogleMapModalProps {
  isOpen: boolean;
  onClose: () => void;
  onAddressSelect: (locationData: LocationFormData) => void;
  googleMapsApiKey: string;
}

const libraries: LoadScriptProps['libraries'] = ['places'];

const mapContainerStyle = {
  width: "100%",
  height: "350px",
  borderRadius: "0.5rem"
};

// Default center (you can set this to your service area's center)
const defaultCenter = { lat: 51.5074, lng: -0.1278 };

export const GoogleMapModal = ({
  isOpen,
  onClose,
  onAddressSelect,
  googleMapsApiKey,
}: GoogleMapModalProps) => {
  // Enhanced error handling for API loading
  const { isLoaded, loadError } = useJsApiLoader({
    googleMapsApiKey,
    libraries,
    id: 'google-map-script',
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [location, setLocation] = useState(defaultCenter);
  const [selectedLocation, setSelectedLocation] = useState<LocationFormData | null>(null);
  const [isLoadingLocation, setIsLoadingLocation] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const searchBoxRef = useRef<google.maps.places.SearchBox | null>(null);

  // Handle API loading error
  useEffect(() => {
    if (loadError) {
      console.error("Google Maps loading error:", loadError);
      setApiError("Failed to load Google Maps. Please try again later.");
      toast.error("Failed to load Google Maps. Please try again later.");
    }
  }, [loadError]);

  // Initialize map with error handling
  const onMapLoad = useCallback((map: google.maps.Map) => {
    try {
      mapRef.current = map;
      setMap(map);
      // Get live location after map is loaded
      getLiveLocation();
    } catch (error) {
      console.error("Map initialization error:", error);
      setApiError("Failed to initialize map. Please refresh the page.");
      toast.error("Failed to initialize map. Please refresh the page.");
    }
  }, []);

  const getLiveLocation = useCallback(() => {
    setIsLoadingLocation(true);

    if (!navigator.geolocation) {
      toast.error("Geolocation is not supported by your browser");
      setIsLoadingLocation(false);
      return;
    }

    const timeoutId = setTimeout(() => {
      setIsLoadingLocation(false);
      toast.error("Location request timed out. Please try again.");
    }, 10000); // 10 second timeout

    navigator.geolocation.getCurrentPosition(
      (position) => {
        clearTimeout(timeoutId);
        const userLocation = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        
        setLocation(userLocation);
        
        if (mapRef.current) {
          try {
            mapRef.current.panTo(userLocation);
            mapRef.current.setZoom(17);
            updateMarker(userLocation);
            reverseGeocode(userLocation);
          } catch (error) {
            console.error("Error updating map with location:", error);
            toast.error("Failed to update map with your location");
          }
        }
        
        setIsLoadingLocation(false);
      },
      (error) => {
        clearTimeout(timeoutId);
        console.error("Geolocation error:", error);
        let errorMessage = "Unable to get your location. ";
        
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage += "Please enable location services.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage += "Location information is unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage += "Location request timed out.";
            break;
          default:
            errorMessage += "An unknown error occurred.";
        }
        
        toast.error(errorMessage);
        setIsLoadingLocation(false);
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  }, []);

  const updateMarker = useCallback((position: google.maps.LatLngLiteral) => {
    if (!mapRef.current) return;

    try {
      if (markerRef.current) {
        markerRef.current.setPosition(position);
      } else {
        markerRef.current = new google.maps.Marker({
          position,
          map: mapRef.current,
          draggable: true,
          animation: google.maps.Animation.DROP,
        });

        markerRef.current.addListener("dragend", () => {
          const newPosition = markerRef.current?.getPosition();
          if (newPosition) {
            const newLocation = {
              lat: newPosition.lat(),
              lng: newPosition.lng(),
            };
            setLocation(newLocation);
            reverseGeocode(newLocation);
          }
        });
      }
    } catch (error) {
      console.error("Error updating marker:", error);
      toast.error("Failed to update location marker");
    }
  }, []);

  const reverseGeocode = async (location: google.maps.LatLngLiteral) => {
    if (!isLoaded) return;

    try {
      const geocoder = new window.google.maps.Geocoder();
      const response = await geocoder.geocode({ location });
      
      if (response.results?.[0]) {
        const place = response.results[0];
        let street = "", postalCode = "", buildingNumber = "";

        place.address_components?.forEach((component) => {
          if (component.types.includes("street_number")) buildingNumber = component.long_name;
          if (component.types.includes("route")) street = component.long_name;
          if (component.types.includes("postal_code")) postalCode = component.long_name;
        });

        const fullStreet = buildingNumber ? `${buildingNumber} ${street}` : street;

        setSelectedLocation({
          address: place.formatted_address || "",
          street: fullStreet || "",
          appartment: "",
          postalCode: postalCode || "",
          label: "HOME",
          latitude: location.lat,
          longitude: location.lng,
        });
      }
    } catch (error) {
      console.error("Geocoding error:", error);
      toast.error("Failed to get address details");
    }
  };

  const onPlacesChanged = useCallback(() => {
    if (searchBoxRef.current) {
      const places = searchBoxRef.current.getPlaces();
      if (places && places.length > 0) {
        const place = places[0];
        const location = {
          lat: place.geometry?.location?.lat() || 0,
          lng: place.geometry?.location?.lng() || 0,
        };
        setLocation(location);
        updateMarker(location);
        reverseGeocode(location);
      }
    }
  }, [updateMarker, reverseGeocode]);

  // Cleanup function
  useEffect(() => {
    return () => {
      if (markerRef.current) {
        markerRef.current.setMap(null);
      }
      if (map) {
        setMap(null);
      }
    };
  }, [map]);

  if (!isLoaded || loadError) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Choose Your Location</DialogTitle>
          </DialogHeader>
          <div className="flex items-center justify-center p-6">
            {!isLoaded && !loadError && (
              <div className="flex items-center">
                <Loader2 className="w-6 h-6 animate-spin mr-2" />
                <span>Loading Google Maps...</span>
              </div>
            )}
            {loadError && (
              <div className="text-red-500 text-center">
                <p>Failed to load Google Maps</p>
                <p className="text-sm mt-2">Please check your internet connection and try again</p>
                <Button onClick={onClose} className="mt-4">
                  Close
                </Button>
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  const handleConfirmLocation = () => {
    if (selectedLocation) {
      onAddressSelect(selectedLocation);
      onClose();
      console.log("Selected location:", selectedLocation);
    } else {
      toast.error("Please select a location first.");
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Choose Your Location</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <StandaloneSearchBox
            onLoad={(ref) => (searchBoxRef.current = ref)}
            onPlacesChanged={onPlacesChanged}
          >
            <input
              type="text"
              placeholder="Search for your location"
              className="w-full p-2 border rounded-md"
            />
          </StandaloneSearchBox>

          <div className="relative h-[350px]">
            <GoogleMap
              mapContainerStyle={mapContainerStyle}
              center={location || { lat: 0, lng: 0 }}
              zoom={17}
              onLoad={onMapLoad}
              onClick={(e) => {
                const latLng = e.latLng;
                if (latLng) {
                  const location = {
                    lat: latLng.lat(),
                    lng: latLng.lng(),
                  };
                  setLocation(location);
                  updateMarker(location);
                  reverseGeocode(location);
                }
              }}
              options={{
                zoomControl: true,
                streetViewControl: false,
                mapTypeControl: false,
                fullscreenControl: false,
              }}
            />

            {isLoadingLocation && (
              <div className="absolute inset-0 flex items-center justify-center bg-white/80">
                <Loader2 className="w-8 h-8 animate-spin" />
                <span className="ml-2">Getting your location...</span>
              </div>
            )}
          </div>

          {selectedLocation && (
            <div className="p-4 bg-gray-50 rounded-lg">
              <div className="flex items-start gap-2">
                <MapPin className="w-5 h-5 text-violet mt-1 flex-shrink-0" />
                <div>
                  <p className="font-medium">Selected Location</p>
                  <p className="text-sm text-gray-600">{selectedLocation.address}</p>
                </div>
              </div>
            </div>
          )}

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button
              onClick={handleConfirmLocation}
              disabled={!selectedLocation || isLoadingLocation}
              className="bg-violet hover:bg-violet/90"
            >
              Confirm Location
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default GoogleMapModal;