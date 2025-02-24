import React, { useState } from "react";
import PlaceItem from "./PlaceItem";
import { Place } from "../../shared/types";
import DeleteAlertModal from "../../shared/components/DeleteAlertModal";
import { useDummyData } from "../../shared/hook/useDummyData";

interface Props {
  places: Place[];
}

const PlaceList = (props: Props) => {
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const [placeIDSelected, setPlaceIDSelected] = useState<string | null>(null);
  const { deletePlace } = useDummyData();

  const handleConfirmDelete = () => {
    deletePlace(placeIDSelected!);
    setIsAlertOpen(false);
  };

  if (props.places.length === 0) return <h1>No Places found!</h1>;

  return (
    <div className="p-5">
      <ul className="flex flex-wrap justify-center gap-4">
        {props.places.map((place, i) => (
          <PlaceItem
            key={i}
            id={place.id}
            image={place.image}
            title={place.title}
            description={place.description}
            address={place.address}
            creatorID={place.creatorID}
            locationUrl={place.locationUrl}
            dateCreated={place.dateCreated}
            setIsAlertOpen={setIsAlertOpen}
            setPlaceIDSelected={setPlaceIDSelected}
          />
        ))}
      </ul>
      <DeleteAlertModal
        isOpen={isAlertOpen}
        onClose={() => setIsAlertOpen(false)}
        title="Delete Item"
        description="Are you sure you want to delete this item? This action cannot be undone."
        onConfirm={handleConfirmDelete}
      />
    </div>
  );
};

export default PlaceList;
