import React from "react";

import OptionMenu from "./OptionMenu";
import { Place } from "../../shared/types";
import { useNavigate } from "react-router-dom";
import LocationSVG from "../../shared/elements/LocationSVG";
import Link from "../../shared/elements/Link";
import { useAuth } from "../../shared/hook/AuthContextHook";

type PlaceItemProps = Place & {
  setIsAlertOpen: (isOpen: boolean) => void;
  setPlaceIDSelected: (placeID: string) => void;
};

const PlaceItem = (props: PlaceItemProps) => {
  const { isLoggedIn } = useAuth(); // isLoggedIn is temporary it should be id of the user like auth.id === props.creator id then OptionMenu = true
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/places/${props.creatorID}/${props.id}/update`);
  };

  const handleDelete = () => {
    props.setPlaceIDSelected(props.id);
    props.setIsAlertOpen(true);
  };

  return (
    <>
      <div className="w-full lg:w-96 md:w-80 rounded-2xl overflow-hidden shadow-lg bg-white border border-gray-200 relative">
        <img
          className="w-full h-52 object-cover"
          src={props.image}
          alt={props.title}
        />

        <div className="absolute top-2 right-2 z-10">
          {isLoggedIn && (
            <OptionMenu onEdit={handleEdit} onDelete={handleDelete} />
          )}
        </div>

        <div className="flex flex-col justify-between p-4">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{props.title}</h2>
            <p className="text-gray-600 text-sm mt-1">{props.description}</p>
            <div className="flex flex-row items-center">
              <LocationSVG h="5" w="5" color="gray" />
              <Link
                location={props.locationUrl}
                label={props.address}
                newTab={true}
              />
            </div>
          </div>
          <div className="mt-3 text-xs text-gray-400 flex justify-between">
            <span>
              Date Posted:{" "}
              <strong>
                {new Date(props.dateCreated).toLocaleDateString("en-US", {
                  month: "short", // "Feb"
                  day: "2-digit", // "12"
                  year: "numeric", // "2025"
                })}
              </strong>
            </span>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlaceItem;
