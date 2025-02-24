import React from "react";
import LocationSVG from "./LocationSVG";

interface Props {
  newTab: boolean;
  location: string;
  label: string;
}

const Link = (props: Props) => {
  if (props.newTab) {
    return (
      <a
        href={props.location}
        target="_blank"
        rel="noopener noreferrer"
        className="hover:cursor-pointer"
      >
        <div className="text-gray-500 text-sm mt-2 hover:underline">
          <span>{props.label}</span>
        </div>
      </a>
    );
  } else {
    return (
      <a href={props.location} className="hover:cursor-pointer">
        <div className="text-gray-500 text-sm mt-2 hover:underline">
          <span>{props.label}</span>
        </div>
      </a>
    );
  }
};

export default Link;
