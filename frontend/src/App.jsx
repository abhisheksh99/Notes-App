import React, { useEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import axios from 'axios';

const App = () => {
  const { currentUser } = useSelector(state => state.user);
  const [searchResults, setSearchResults] = useState([]);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!currentUser && location.pathname === "/") {
      navigate("/login");
    }
  }, [currentUser, navigate, location.pathname]);

  // Search handler to fetch notes based on query
  const handleSearch = async (query) => {
    if (query) {
      try {
        const res = await axios.get(`http://localhost:3000/api/note/search?query=${query}`, {
          withCredentials: true,
        });
        if (res.data.success) {
          setSearchResults(res.data.notes);
        }
      } catch (error) {
        console.error("Error fetching search results:", error.message);
      }
    } else {
      setSearchResults([]); // Clear results if search is cleared
    }
  };

  return (
    <>
      <Navbar handleSearch={handleSearch} />
      <Routes>
        <Route path="/" element={<Home searchResults={searchResults} />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
