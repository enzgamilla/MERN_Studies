import React, { createContext, useState, ReactNode } from "react";
import { Place } from "../types";
import { DUMMY_DATA } from "../DummyData";

interface DummyDataContextType {
  dummyData: Place[];
  addPlace: (place: Omit<Place, "id" | "dateCreated">) => void;
  updatePlace: (id: string, updatedPlace: Partial<Place>) => void;
  deletePlace: (id: string) => void;
  getPlaceById: (id: string) => Place | undefined;
}

const DummyDataContext = createContext<DummyDataContextType | undefined>(
  undefined
);

const DummyDataProvider = ({ children }: { children: ReactNode }) => {
  const [dummyData, setDummyData] = useState<Place[]>(DUMMY_DATA);

  const addPlace = (place: Omit<Place, "id" | "dateCreated">) => {
    const newPlace = {
      ...place,
      id: Math.random().toString(36).substr(2, 9),
      dateCreated: new Date().toISOString(),
    };
    setDummyData((prevData) => [...prevData, newPlace]);
  };

  const updatePlace = (id: string, updatedPlace: Partial<Place>) => {
    setDummyData((prevData) =>
      prevData.map((place) =>
        place.id === id ? { ...place, ...updatedPlace } : place
      )
    );
  };

  const deletePlace = (id: string) => {
    const updatedPlace = dummyData.filter((place) => place.id !== id);
    setDummyData(updatedPlace);
  };

  const getPlaceById = (id: string) => {
    return dummyData.find((place) => place.id === id);
  };

  return (
    <DummyDataContext.Provider
      value={{ dummyData, addPlace, updatePlace, deletePlace, getPlaceById }}
    >
      {children}
    </DummyDataContext.Provider>
  );
};

export { DummyDataContext, DummyDataProvider };
