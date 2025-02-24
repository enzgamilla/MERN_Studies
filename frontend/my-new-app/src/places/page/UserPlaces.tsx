import React from "react";
import { useParams } from "react-router-dom";
import { useDummyData } from "../../shared/hook/useDummyData";
import PlaceList from "../components/PlaceList";

const UserPlaces = () => {
  const { dummyData } = useDummyData();

  const userId = useParams().uid;
  const loadedPlaces = dummyData.filter((place) => place.creatorID === userId);

  return <PlaceList places={loadedPlaces} />;
};

export default UserPlaces;
