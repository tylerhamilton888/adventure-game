import React from 'react';
import { useNavigate } from 'react-router-dom';

const IntegratedNavigation = ({ currentPath, showReturnButton }) => {
  const navigate = useNavigate();

  const handleGoToInventory = () => {
    // Only store the current path if it's a level path
    if (currentPath.includes('/level')) {
      localStorage.setItem('previousPath', currentPath);
    }
    navigate('/inventory');
  };

  const handleGoToCharacter = () => {
    // Only store the current path if it's a level path
    if (currentPath.includes('/level')) {
      localStorage.setItem('previousPath', currentPath);
    }
    navigate('/my-character');
  };

  const handleReturnToPrevious = () => {
    const previousPath = localStorage.getItem('previousPath');
    if (previousPath && previousPath.includes('/level')) {
      navigate(previousPath);
    } else {
      navigate('/home');
    }
  };

  return (
    <div>
      <button onClick={handleGoToInventory}>View Inventory</button>
      <button onClick={handleGoToCharacter}>View Character Stats</button>
      {showReturnButton && (
        <button onClick={handleReturnToPrevious}>Return to Adventure</button>
      )}
    </div>
  );
};

export default IntegratedNavigation;