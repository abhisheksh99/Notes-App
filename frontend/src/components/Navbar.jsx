import React, { useState } from "react";
import SearchBar from "./SearchBar";
import ProfileInfo from "./ProfileInfo";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [seacrchQuery, setSeacrchQuery] = useState("");
  const navigate = useNavigate()

  const handleSearch = () => {};
  const clearSearch = () => {
    setSeacrchQuery("");
  };

  const onLogout = () => {
    navigate("/login")
  };
  return (
    <div className="bg-slate-200 flex items-center justify-between px-6 py-2 drop-shadow-sm">
      <h2 className="text-2xl font-medium text-black py-2 px-5">
        <span className="text-slate-700">Good</span>
        <span className="text-slate-900">Notes</span>
      </h2>
      <SearchBar
        value={seacrchQuery}
        onChange={(e) => setSeacrchQuery(e.target.value)}
        handleSearch={handleSearch}
        clearSearch={clearSearch}
      />
      <ProfileInfo onLogout={onLogout}/>
    </div>
  );
};

export default Navbar;
