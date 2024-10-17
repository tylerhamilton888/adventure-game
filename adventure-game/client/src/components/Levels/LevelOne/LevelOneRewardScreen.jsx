import React from 'react';
import { useNavigate } from 'react-router-dom';
import IntegratedNavigation from '../../IntegratedNavigation.jsx';

// Component for the reward screen after completing Level One
const LevelOneRewardScreen = () => {
  const navigate = useNavigate();

  const handleProceed = () => {
    navigate('/level-selection');
  };

  return (
    <div>
      <h2>Congratulations!</h2>
      <p>
        You've successfully completed the tutorial level! Your journey has just begun, but you've already proven your
        skills by collecting valuable items and facing dangerous enemies.
      </p>
      <button onClick={handleProceed}>Return to Level Selection</button>
      <IntegratedNavigation currentPath={window.location.pathname} />
    </div>
  );
};

export default LevelOneRewardScreen;
