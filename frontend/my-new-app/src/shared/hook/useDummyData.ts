import { useContext } from "react";
import { DummyDataContext } from "../context/DummyDataContext";

export const useDummyData = () => {
  const context = useContext(DummyDataContext);
  if (!context) {
    throw new Error("useDummyData must be used within a DummyDataProvider");
  }
  return context;
};
