import React, { useState } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import ApplicationViews from './components/views/ApplicationViews.jsx';
import Navbar from './components/Navbar'; // Import a Navbar component for handling login/logout UI

function App() {
  // Manage login state
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("userProfile"));

  return (
    <Router>
      {/* Render Navbar with login state */}
      <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
      
      {/* Pass isLoggedIn state and handler to ApplicationViews */}
      <ApplicationViews isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
    </Router>
  );
}

export default App;
