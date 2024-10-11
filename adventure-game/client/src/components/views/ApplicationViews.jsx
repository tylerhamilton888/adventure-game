import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Login from '../Login.jsx';
import Home from '../Home.jsx'; // Main component after login
import Register from '../Register.jsx';
import CharacterForm from '../Characters/CharacterForm.jsx';
import CharacterSelector from '../Characters/CharacterSelector.jsx';

export default function ApplicationViews({ isLoggedIn, setIsLoggedIn }) {
  // Fetch userId from localStorage
  const userId = JSON.parse(localStorage.getItem('userProfile'))?.id;

  return (
    <Routes>
      {/* If user is logged in, render the homepage */}
      {isLoggedIn ? (
        <>
          <Route path="/" element={<Home />} />
          <Route path="/create-character" element={<CharacterForm userId={userId} />} /> {/* Pass userId to CharacterForm */}
          <Route path="/select-character" element={<CharacterSelector loggedInUserId={userId} />} /> {/* Pass userId to CharacterSelector */}
        </>
      ) : (
        <>
          {/* If not logged in, redirect to login */}
          <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />} />
          <Route path="*" element={<Login setIsLoggedIn={setIsLoggedIn} />} /> {/* Default to login */}
          <Route path="/register" element={<Register />} />
        </>
      )}
    </Routes>
  );
}
