import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import SearchBar from "./SearchBar";
import ProfileInfo from "./ProfileInfo";

const Navbar = ({ userInfo }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {};
  const clearSearch = () => setSearchQuery("");

  const onLogout = () => navigate("/login");

  return (
    <div className="bg-slate-200 flex items-center justify-between px-6 py-2 drop-shadow-sm">
      <Link to="/">
        <h2 className="text-2xl font-medium text-black py-2 px-5">
          <span className="text-slate-700">Good</span>
          <span className="text-slate-900">Notes</span>
        </h2>
      </Link>

      <SearchBar
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        handleSearch={handleSearch}
        clearSearch={clearSearch}
      />

      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
