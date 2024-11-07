import React from 'react';
import { FiSearch } from 'react-icons/fi';
import { IoMdCloseCircleOutline } from 'react-icons/io';

const SearchBar = ({ value, onChange, handleSearch, clearSearch }) => {
  return (
    <div className="flex items-center bg-white border border-gray-300 rounded-full px-4 py-2 shadow-sm w-full max-w-md mx-auto">
      <FiSearch className="text-gray-500 mr-2 cursor-pointer" onClick={handleSearch} />
      <input
        type="text"
        placeholder="Search Notes..."
        className="w-full text-sm bg-transparent outline-none placeholder-gray-400"
        value={value}
        onChange={onChange}
      />
      {value && (
        <IoMdCloseCircleOutline 
          className="text-gray-500 cursor-pointer hover:text-gray-700 ml-2" 
          onClick={clearSearch} 
        />
      )}
    </div>
  );
};

export default SearchBar;
