import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { saveGameHandler } from './managers/SaveGameManager';

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
    const navigate = useNavigate();
    const [hasCharacter, setHasCharacter] = useState(false); // State to track if a character is selected

    // Check for selected character in localStorage when the component mounts
    useEffect(() => {
        const selectedCharacter = localStorage.getItem('selectedCharacter');
        setHasCharacter(!!selectedCharacter); // Set to true if a character is selected
    }, []);

    const handleLogout = () => {
        localStorage.clear(); // Clear the user and character from local storage
        setIsLoggedIn(false); // Update the login state
        navigate("/"); // Redirect to homepage
    };

    return (
        <nav>
            <ul>
                {isLoggedIn ? (
                    <>
                        <li><button onClick={handleLogout}>Logout</button></li>
                        <li><Link to="/create-character">Create Character</Link></li>
                        <li><Link to="/select-character">Select Character</Link></li>
                        {/* Show Inventory link if a character is selected */}
                        {hasCharacter && <li><Link to="/inventory">Inventory</Link></li>}
                        <li><Link to="/my-character">My Character</Link></li>
                        <li><Link to="/level-selection">New Adventure</Link></li>
                        <li><Link to="/combat-explanation">Combat Explanation</Link></li>
                        <li><Link to="/saved-games">My Saved Games</Link></li>
                        <li><button onClick={() => saveGameHandler()}>Save Progress</button></li>
                    </>
                ) : (
                    <>
                        <li><Link to="/login">Login</Link></li>
                        <li><Link to="/register">Register</Link></li>
                    </>
                )}
            </ul>
        </nav>
    );
}
