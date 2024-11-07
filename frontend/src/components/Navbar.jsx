import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import SearchBar from "./SearchBar";
import ProfileInfo from "./ProfileInfo";
import { signOutStart, signOutSuccess, signOutFailure } from "../store/userSlice/userSlice";

const Navbar = ({ handleSearch }) => {
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.currentUser);

  const onLogout = async () => {
    try {
      dispatch(signOutStart());
      const res = await axios.post("http://localhost:3000/api/user/signout", {}, {
        withCredentials: true,
      });
      
      if (!res.data.success) {
        dispatch(signOutFailure(res.data.message));
        return;
      }
      dispatch(signOutSuccess());
      navigate("/login");
    } catch (error) {
      dispatch(signOutFailure(error.message));
    }
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
    handleSearch(e.target.value); // Pass search query to App
  };

  const clearSearch = () => {
    setSearchQuery("");
    handleSearch(""); // Clear search results
  };

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
        onChange={handleSearchChange}
        handleSearch={() => handleSearch(searchQuery)}
        clearSearch={clearSearch}
      />

      <ProfileInfo userInfo={userInfo} onLogout={onLogout} />
    </div>
  );
};

export default Navbar;
