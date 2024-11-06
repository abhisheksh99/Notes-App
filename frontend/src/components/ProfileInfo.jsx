import React, { useState } from 'react';
import {getInitials} from "../utils/helper"

const ProfileInfo = ({onLogout}) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left">
      {/* Profile initials */}
      <div
        onClick={toggleDropdown}
        className="flex items-center justify-center w-10 h-10 bg-slate-800 text-white font-bold rounded-full cursor-pointer"
      >
        {getInitials("Abhishek Sharma")}
      </div>

      {/* Dropdown menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="p-4">
            <p className="text-gray-900 font-semibold">Abhishek</p>
          </div>
          <button
            onClick={onLogout}
            className="w-full text-left px-4 py-2 text-white bg-red-700 rounded-b-lg"
          >
            Logout
          </button>
        </div>
      )}
    </div>
  );
};

export default ProfileInfo;
