import React, { useState } from 'react';
import { getInitials } from "../utils/helper";

const ProfileInfo = ({ onLogout, userInfo }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropdown = () => setIsOpen(!isOpen);

  return (
    <div className="relative inline-block text-left">
      {/* Display initials if user exists, otherwise "NA" */}
      <div
        onClick={userInfo ? toggleDropdown : null} // Only toggle dropdown if userInfo exists
        className="flex items-center justify-center w-10 h-10 bg-slate-800 text-white font-bold rounded-full cursor-pointer"
      >
        {userInfo ? getInitials(userInfo.username) : "NA"}
      </div>

      {/* Show dropdown only if userInfo exists */}
      {isOpen && userInfo && (
        <div className="absolute right-0 mt-2 w-32 bg-white border border-gray-200 rounded-lg shadow-lg">
          <div className="p-4">
            <p className="text-gray-900 font-semibold">{userInfo.username}</p>
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
