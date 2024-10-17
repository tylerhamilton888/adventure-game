import React from 'react';
import { useNavigate } from 'react-router-dom';
import { addItemToInventory } from '../../managers/InventoryManager';
import IntegratedNavigation from '../../IntegratedNavigation.jsx';

// Component for discovering the Great Axe
const LevelOneAxeDiscovery = () => {
  const navigate = useNavigate();

  const handleCollectAxe = async () => {
    const selectedCharacter = JSON.parse(localStorage.getItem('selectedCharacter'));
    if (!selectedCharacter) {
      console.error('No character selected');
      return;
    }

    try {
      const response = await addItemToInventory(selectedCharacter.id, 4);
      if (!response.success) {
        throw new Error(response.message || 'Failed to add item to inventory');
      }
      alert('You have picked up the Great Axe!');
      navigate('/level-one/new-location');
    } catch (error) {
      console.error('Error adding item to inventory:', error);
    }
  };

  return (
    <div>
      <h2>Discovery: The Great Axe</h2>
      <p>
        As you move through the dark path, you spot an abandoned Great Axe. Its blade glimmers in the faint light,
        and the handle feels sturdy and reliable.
      </p>
      <button onClick={handleCollectAxe}>Pick up the Great Axe</button>
      <IntegratedNavigation currentPath={window.location.pathname} />
    </div>
  );
};

export default LevelOneAxeDiscovery;
