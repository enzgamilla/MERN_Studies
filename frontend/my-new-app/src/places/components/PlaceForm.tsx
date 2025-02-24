import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Place } from "../../shared/types";
import MapSelectorModal from "./MapSelectorModal";
import Input from "../../shared/elements/Input";
import ImageUploader from "../../shared/components/ImageUploader";
import LocationSVG from "../../shared/elements/LocationSVG";

interface PlaceFormProps {
  isUpdateMode: boolean;
  initialValues?: {
    image?: string;
    title?: string;
    description?: string;
    address?: string;
    creatorID?: string;
    locationUrl?: string;
  };
  onSubmit: (place: Omit<Place, "id" | "dateCreated">) => void;
}

const PlaceForm = ({
  isUpdateMode,
  initialValues,
  onSubmit,
}: PlaceFormProps) => {
  const [selectedLocation, setSelectedLocation] = useState<string>(
    initialValues?.locationUrl || ""
  );
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const [imagePreview, setImagePreview] = useState<string | null>(
    initialValues?.image || null
  );
  const [title, setTitle] = useState<string>(initialValues?.title || "");
  const [description, setDescription] = useState<string>(
    initialValues?.description || ""
  );
  const [address, setAddress] = useState<string>(initialValues?.address || "");
  const [creatorID, setCreatorID] = useState<string>(
    initialValues?.creatorID || ""
  );

  const navigate = useNavigate();

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    if (!imagePreview) {
      alert("Please upload an image.");
      return;
    }

    // Create a new place object (without id and dateCreated)
    const newPlace = {
      image: imagePreview,
      title,
      description,
      address,
      creatorID,
      locationUrl: selectedLocation,
    };

    // Call the onSubmit handler passed as a prop
    onSubmit(newPlace);

    // Reset the form fields if not in update mode
    if (!isUpdateMode) {
      setTitle("");
      setDescription("");
      setAddress("");
      setCreatorID("");
      setImagePreview(null);
      setSelectedLocation("");
    }

    navigate(`/places/${creatorID}`);
  };

  return (
    <div className="shadow-lg h-fit p-5 m-5 bg-white rounded-lg border border-gray-300">
      <form
        className="flex flex-col space-y-5 text-sm md:flex-row md:space-x-5 md:space-y-0"
        onSubmit={handleSubmit}
      >
        {/* Left Column: Input Fields */}
        <div className="flex flex-col space-y-3 flex-1">
          <Input type="text" title="Title" value={title} setValue={setTitle} />
          <Input
            type="text"
            title="Address"
            value={address}
            setValue={setAddress}
          />
          <Input
            type="textarea"
            title="Description"
            value={description}
            setValue={setDescription}
          />
          {/* replacer for user user id for a while */}
          <Input
            type="text"
            title="Creator"
            value={creatorID}
            setValue={setCreatorID}
          />
        </div>

        {/* Right Column: Image Upload and Location Selector */}
        <div className="flex flex-col space-y-5 flex-1">
          {/* Image Upload Component */}
          <ImageUploader
            setValue={setImagePreview}
            imageValue={imagePreview!}
          />
          {/* Location Selector */}
          <div className="flex flex-col space-y-3">
            <button
              type="button"
              onClick={() => setIsModalOpen(!isModalOpen)}
              className="flex items-center justify-center px-4 py-2 bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-50 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 hover:cursor-pointer"
            >
              <span className="text-sm font-medium text-gray-700">
                Select Location
              </span>
            </button>

            {/* Selected Location Display */}
            {selectedLocation && (
              <div className="flex items-center justify-center p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <LocationSVG h="5" w="5" color="gray" />
                <span className="text-sm text-gray-700 truncate overflow-hidden">
                  {selectedLocation.length > 20
                    ? `${selectedLocation.slice(0, 20)}...`
                    : selectedLocation.length > 50
                    ? `${selectedLocation.slice(0, 50)}...`
                    : selectedLocation}
                </span>
              </div>
            )}

            {/* Modal for Map Selection */}
            {isModalOpen && (
              <MapSelectorModal
                isModalOpen={isModalOpen}
                setIsModalOpen={setIsModalOpen}
                handleSelectLocation={setSelectedLocation}
              />
            )}
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="px-4 py-2 bg-blue-600 text-white rounded-sm hover:bg-blue-700 w-full md:w-auto hover:cursor-pointer"
          >
            {isUpdateMode ? "Update Place" : "Create Place"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default PlaceForm;
