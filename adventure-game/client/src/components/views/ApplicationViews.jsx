import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../Login.jsx';
import Home from '../Home.jsx';
import Register from '../Register.jsx';
import CharacterForm from '../Characters/CharacterForm.jsx';
import CharacterSelector from '../Characters/CharacterSelector.jsx';

export default function ApplicationViews({ isLoggedIn, setIsLoggedIn }) {
  const userProfile = localStorage.getItem('userProfile') ? JSON.parse(localStorage.getItem('userProfile')) : null;
  const userId = userProfile?.id;

  console.log('User ID in ApplicationViews:', userId); // Ensure it's logged

  return (
    <Routes>
      {isLoggedIn ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/create-character" element={<CharacterForm />} />
          {/* Passing the userId directly as a prop */}
          <Route path="/select-character" element={<CharacterSelector userId={userId} />} />
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
