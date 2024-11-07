import React, { useEffect } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Home from './pages/Home';
import SignUp from './pages/SignUp';
import Login from './pages/Login';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

const App = () => {
  const { currentUser } = useSelector(state => state.user);
  console.log("Current User in App:", currentUser);
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      navigate("/login");
    }
  }, [currentUser, navigate]);

  return (
    <>
      <Navbar userInfo={currentUser?.user} />
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
