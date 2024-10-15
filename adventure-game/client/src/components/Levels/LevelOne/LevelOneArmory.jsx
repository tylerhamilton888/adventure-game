import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function LevelOneArmory() {
  const navigate = useNavigate();
  const [itemsCollected, setItemsCollected] = useState(
    JSON.parse(localStorage.getItem('itemsCollected')) || { sword: false, shield: false }
  );

  const handleCollectItem = (item) => {
    const updatedItems = { ...itemsCollected, [item]: true };
    setItemsCollected(updatedItems);
    localStorage.setItem('itemsCollected', JSON.stringify(updatedItems));
  };

  const handleProceed = () => {
    navigate('/level-one/crossroads');
  };

  return (
    <div>
      <h2>The Armory</h2>
      <p>The armory is filled with old, dust-covered weapons. You spot a sturdy sword and a reliable shield.</p>
      <button
        onClick={() => handleCollectItem('sword')}
        disabled={itemsCollected.sword}
      >
        {itemsCollected.sword ? 'Sword Collected' : 'Pick up Sword'}
      </button>
      <button
        onClick={() => handleCollectItem('shield')}
        disabled={itemsCollected.shield}
      >
        {itemsCollected.shield ? 'Shield Collected' : 'Pick up Shield'}
      </button>
      {itemsCollected.sword && itemsCollected.shield && (
        <button onClick={handleProceed}>Proceed to the Crossroads</button>
      )}
    </div>
  );
}
