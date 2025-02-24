import React, { useState } from "react";
import { useAuth } from "../hook/AuthContextHook";

const MainHeader = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { isLoggedIn, logout } = useAuth();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleAuth = () => {
    logout();
  };

  return (
    <header className="bg-amber-500 shadow-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <a href="/" className="flex items-center w-100 space-x-2">
            <span className="text-black text-lg">YourPlace</span>
          </a>

          <nav className="justify-center items-center hidden md:flex space-x-4">
            {isLoggedIn && (
              <>
                <a
                  href={`/:uid/places`}
                  className="text-gray-700 hover:text-gray-900"
                >
                  My Place
                </a>
                <a
                  href="/places/new"
                  className="text-gray-700 hover:text-gray-900"
                >
                  Add Place
                </a>
              </>
            )}

            <button
              onClick={handleAuth}
              className="text-gray-700 hover:text-gray-900 bg-transparent border-none cursor-pointer p-0"
            >
              {!isLoggedIn ? "Login" : "Logout"}
            </button>
          </nav>

          <div className="md:hidden">
            <button className="focus:outline-none" onClick={toggleMenu}>
              <span
                className={`block w-6 h-0.5 bg-black transition-transform ${
                  isMenuOpen ? "rotate-45 translate-y-1.5" : ""
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-black mt-1.5 transition-opacity ${
                  isMenuOpen ? "opacity-0" : ""
                }`}
              ></span>
              <span
                className={`block w-6 h-0.5 bg-black mt-1.5 transition-transform ${
                  isMenuOpen ? "-rotate-45 -translate-y-2.5" : ""
                }`}
              ></span>
            </button>
          </div>
        </div>

        <nav
          className={`pb-2 items-center md:hidden flex-col space-y-2 mt-2  ${
            isMenuOpen ? "flex" : "hidden"
          }`}
        >
          <a href={`/uid/places`} className="text-gray-700 hover:text-gray-900">
            My Place
          </a>
          <a href="/places/new" className="text-gray-700 hover:text-gray-900">
            Add Place
          </a>
          <a href="/auth" className="text-gray-700 hover:text-gray-900">
            Authenticate
          </a>
        </nav>
      </div>
    </header>
  );
};

export default MainHeader;
