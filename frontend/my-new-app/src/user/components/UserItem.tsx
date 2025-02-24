import React from "react";
import { Link } from "react-router-dom";

interface Props {
  id: string;
  name: string;
  image?: string;
  placeCount: number;
}

const UserItem = (props: Props) => {
  return (
    <div className="m-2 bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow duration-300 border border-gray-200">
      <div className="flex items-center space-x-4">
        <div className="w-15 h-15 rounded-full overflow-hidden">
          {props.image ? (
            <div className="w-15 h-15 rounded-full overflow-hidden">
              <img
                src={props.image}
                alt={props.name}
                className="w-full h-full object-cover"
              />
            </div>
          ) : (
            <div
              className={`w-15 h-15 rounded-full flex items-center justify-center text-white font-bold text-lg bg-amber-500`}
            >
              {props.name.charAt(0).toUpperCase()}
            </div>
          )}
        </div>
        <div className="flex flex-col">
          <Link
            to={`/places/${props.id}`}
            className="text-lg font-semibold text-gray-800 hover:text-gray-600 transition-colors duration-300"
          >
            {props.name}
          </Link>
          <h3 className="text-sm text-gray-500">{props.placeCount} Places</h3>
        </div>
      </div>
    </div>
  );
};

export default UserItem;
