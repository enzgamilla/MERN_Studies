import React, { useState, useRef, useEffect } from "react";
import { MapContainer, TileLayer, Marker, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

interface MapModalProps {
  isModalOpen: boolean;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSelectLocation: (location: string) => void;
}

const MapSelectorModal = ({
  isModalOpen,
  setIsModalOpen,
  handleSelectLocation,
}: MapModalProps) => {
  const [mapCenter, setMapCenter] = useState<[number, number]>([
    37.7749, -122.4194,
  ]); // Default to San Francisco
  const [selectedPosition, setSelectedPosition] =
    useState<[number, number]>(mapCenter);
  const [searchInput, setSearchInput] = useState<string>("");

  const mapRef = useRef<L.Map | null>(null);
  const markerRef = useRef<L.Marker | null>(null);

  // Handle map click to set marker position
  const handleMapClick = (e: L.LeafletMouseEvent) => {
    const newPosition: [number, number] = [e.latlng.lat, e.latlng.lng];
    setSelectedPosition(newPosition);
    setMapCenter(newPosition);
  };

  // Handle search for a location using Nominatim
  const handleSearch = async () => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          searchInput
        )}`
      );
      const data = await response.json();
      if (data.length > 0) {
        const { lat, lon } = data[0];
        const newPosition: [number, number] = [
          parseFloat(lat),
          parseFloat(lon),
        ];
        setSelectedPosition(newPosition);
        setMapCenter(newPosition);
      } else {
        alert("Location not found!");
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
    }
  };

  // Generate OpenStreetMap URL for the selected location
  const generateMapUrl = (position: [number, number]): string => {
    const [lat, lng] = position;
    return `https://www.openstreetmap.org/#map=16/${lat}/${lng}`;
  };

  // Update marker position when selectedPosition changes
  useEffect(() => {
    if (mapRef.current && markerRef.current) {
      markerRef.current.setLatLng(selectedPosition);
    }
  }, [selectedPosition]);

  if (!isModalOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900/50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h2 className="text-lg font-semibold mb-3">Select Location</h2>

        {/* Search input for location */}
        <div className="flex space-x-2 mb-3">
          <input
            type="text"
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="border border-gray-400 rounded-sm p-2 w-full shadow-sm"
            placeholder="Search for a location"
          />
          <button
            type="button"
            onClick={handleSearch}
            className="px-4 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700"
          >
            Search
          </button>
        </div>

        {/* Leaflet Map */}
        <MapContainer
          center={mapCenter}
          zoom={13}
          style={{ height: "400px", width: "100%" }}
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          />
          <Marker
            position={selectedPosition}
            ref={markerRef}
            eventHandlers={{
              click: (e) => handleMapClick(e),
            }}
          />
          <MapClickHandler onClick={handleMapClick} />
        </MapContainer>

        <div className="flex justify-end mt-4">
          <button
            type="button"
            onClick={() => setIsModalOpen(false)}
            className="mr-2 px-4 py-2 bg-gray-300 rounded-sm hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={() => {
              const mapUrl = generateMapUrl(selectedPosition);
              handleSelectLocation(mapUrl); // Pass the generated URL to the parent
              setIsModalOpen(false); // Close the modal
            }}
            className="px-4 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
};

const MapClickHandler = ({
  onClick,
}: {
  onClick: (e: L.LeafletMouseEvent) => void;
}) => {
  const map = useMap();
  useEffect(() => {
    map.on("click", onClick);
    return () => {
      map.off("click", onClick);
    };
  }, [map, onClick]);
  return null;
};

export default MapSelectorModal;
