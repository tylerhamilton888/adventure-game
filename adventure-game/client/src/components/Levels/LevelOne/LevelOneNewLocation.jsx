import React from 'react';
import { useNavigate } from 'react-router-dom';
import IntegratedNavigation from '../../IntegratedNavigation.jsx';

// Component for exploring the new enchanted clearing
const LevelOneNewLocation = () => {
  const navigate = useNavigate();

  const handleProceed = () => {
    navigate('/level-one/goblin-encounter');
  };

  return (
    <div>
      <h2>The Enchanted Clearing</h2>
      <p>
        You enter a new location: an enchanted clearing with strange glowing flowers and an eerie quiet.
        The air is thick, as if something is watching you. It's both beautiful and unsettling.
      </p>
      <button onClick={handleProceed}>Proceed</button>
      <IntegratedNavigation currentPath={window.location.pathname} />
    </div>

  );
};

export default LevelOneNewLocation;
