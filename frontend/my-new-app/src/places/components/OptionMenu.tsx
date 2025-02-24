import React, { useState } from "react";

interface OptionsMenuProps {
  onEdit: () => void;
  onDelete: () => void;
}

const OptionMenu = ({ onEdit, onDelete }) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  return (
    <div className="relative">
      <button
        onClick={toggleMenu}
        className="w-8 h-8 rounded-full bg-gray-950/10 text-gray-100 flex items-center justify-center hover:cursor-pointer hover:bg-white"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          fill="currentColor"
          className="text-white hover:text-gray-700"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="6" r="2" />
          <circle cx="12" cy="12" r="2" />
          <circle cx="12" cy="18" r="2" />
        </svg>
      </button>

      {isMenuOpen && (
        <div className="absolute top-12 right-0 bg-gray-300/50 shadow-lg rounded-lg p-2 flex flex-col space-y-2 z-10">
          <button
            onClick={() => {
              onEdit(); // Trigger edit action
              setIsMenuOpen(false); // Close menu after action
            }}
            className="text-sm font-bold text-black hover:bg-white p-2 rounded hover:cursor-pointer"
          >
            Edit
          </button>
          <button
            onClick={() => {
              onDelete(); // Trigger delete action
              setIsMenuOpen(false); // Close menu after action
            }}
            className="text-sm font-bold text-black hover:bg-white p-2 rounded hover:cursor-pointer"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default OptionMenu;
