import React from "react";

interface Props {
  h?: "3" | "4" | "5" | "6" | "7" | "8"; // Predefined Tailwind height values
  w?: "3" | "4" | "5" | "6" | "7" | "8"; // Predefined Tailwind width values
  color?: string; // e.g., "gray"
}

const LocationSVG = (props: Props) => {
  const sizeClass = `h-${props.h || "5"} w-${props.w || "5"}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className={`${sizeClass} mr-2 text-${
        props.color?.toLowerCase() || "gray"
      }-600`}
      viewBox="0 0 20 20"
      fill="currentColor"
    >
      <path
        fillRule="evenodd"
        d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
        clipRule="evenodd"
      />
    </svg>
  );
};

export default LocationSVG;
