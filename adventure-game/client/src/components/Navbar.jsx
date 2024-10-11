import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Navbar({ isLoggedIn, setIsLoggedIn }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.clear(); // Clear the user from local storage
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
