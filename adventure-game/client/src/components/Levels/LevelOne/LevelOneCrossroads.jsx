import React from 'react';
import { useNavigate } from 'react-router-dom';
import IntegratedNavigation from '../../IntegratedNavigation.jsx';

export default function LevelOneCrossroads() {
  const navigate = useNavigate();

  const handleChoosePath = (path) => {
    navigate(`/level-one/encounter/${path}`);
  };

  return (
    <div>
      <h2>The Crossroads</h2>
      <p>
        You find yourself at a crossroads. To the left lies a dark forest, where an eerie howling echoes through the trees.
        To the right, a rocky trail leads to a clearing where strange shadows move in the distance.
      </p>
      <button onClick={() => handleChoosePath('forest')}>Take the Left Path - The Dark Forest</button>
      <button onClick={() => handleChoosePath('clearing')}>Take the Right Path - The Rocky Clearing</button>

      <IntegratedNavigation currentPath={window.location.pathname} />
    </div>
  );
}
