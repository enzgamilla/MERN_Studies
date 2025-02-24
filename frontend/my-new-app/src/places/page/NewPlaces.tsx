import React from "react";
import PlaceForm from "../components/PlaceForm";
import { useDummyData } from "../../shared/hook/useDummyData";
import { Place } from "../../shared/types";

const NewPlaces = () => {
  const { addPlace } = useDummyData();

  const handleSubmit = (place: Omit<Place, "id" | "dateCreated">) => {
    addPlace(place);
  };

  return (
    <div className="w-full max-w-xs md:max-w-2xl lg:max-w-3xl xl:max-w-xl mx-auto">
      <PlaceForm isUpdateMode={false} onSubmit={handleSubmit} />
    </div>
  );
};

export default NewPlaces;
