import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../Login.jsx';
import Home from '../Home.jsx';
import Register from '../Register.jsx';
import CharacterForm from '../Characters/CharacterForm.jsx';
import CharacterSelector from '../Characters/CharacterSelector.jsx';
import Inventory from '../Inventory.jsx';

export default function ApplicationViews({ isLoggedIn, setIsLoggedIn }) {
  const userProfile = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : null;
  const userId = userProfile?.id;

  

  return (
    <Routes>
      {isLoggedIn ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/create-character" element={<CharacterForm />} />
          
          <Route path="/select-character" element={<CharacterSelector userId={userId} />} />
          <Route path="/inventory" element={<Inventory />} />
        </>
      ) : (
        <>
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="*" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="/register" element={<Register />} />
        </>
      )}
    </Routes>
  );
}
