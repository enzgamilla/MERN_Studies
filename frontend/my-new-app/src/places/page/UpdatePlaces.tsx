import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PlaceForm from "../components/PlaceForm";
import { useDummyData } from "../../shared/hook/useDummyData";
import { Place } from "../../shared/types";

const UpdatePlaces = () => {
  const { uid, placeID } = useParams<{
    uid: string;
    placeID: string;
  }>();

  const { getPlaceById, updatePlace } = useDummyData();
  const [initialValues, setInitialValues] = useState<
    Omit<Place, "id" | "dateCreated">
  >({
    image: "",
    title: "",
    description: "",
    address: "",
    creatorID: "",
    locationUrl: "",
  });
  const [loading, setLoading] = useState(true);

  // Inside UpdatePlaces.tsx
  useEffect(() => {
    if (placeID && uid) {
      const place = getPlaceById(placeID); // Use the context function
      if (place && place.creatorID === uid) {
        setInitialValues({
          image: place.image,
          title: place.title,
          description: place.description,
          address: place.address,
          creatorID: place.creatorID,
          locationUrl: place.locationUrl,
        });
      }
      setLoading(false);
    }
  }, [placeID, uid, getPlaceById]);

  const handleSubmit = (updatedPlace: Omit<Place, "id" | "dateCreated">) => {
    if (placeID) {
      updatePlace(placeID, updatedPlace);
    }
  };

  if (loading) {
    return <div>Loading...</div>; // Show a loading message
  }

  if (!initialValues) {
    return <div>Place not found.</div>; // Handle case where place is not found
  }

  return (
    <div className="w-full max-w-xs md:max-w-2xl lg:max-w-3xl xl:max-w-xl mx-auto">
      <PlaceForm
        isUpdateMode={true}
        initialValues={initialValues}
        onSubmit={handleSubmit}
      />
    </div>
  );
};

export default UpdatePlaces;
