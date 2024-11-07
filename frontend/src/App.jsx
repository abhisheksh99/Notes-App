import React, { useEffect } from 'react';
import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  const { currentUser } = useSelector(state => state.user);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Redirect to login only if user is not logged in and accessing a protected route ("/")
    if (!currentUser && location.pathname === "/") {
      navigate("/login");
    }
  }, [currentUser, navigate, location.pathname]);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
      </Routes>
      <Footer />
    </>
  );
};

export default App;
