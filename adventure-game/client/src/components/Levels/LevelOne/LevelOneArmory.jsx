import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addItemToInventory } from '../../managers/InventoryManager';

export default function LevelOneArmory() {
  const navigate = useNavigate();
  const [itemsCollected, setItemsCollected] = useState(
    JSON.parse(localStorage.getItem('itemsCollected')) || { sword: false, shield: false }
  );
  const selectedCharacter = JSON.parse(localStorage.getItem('selectedCharacter'));

  const handleCollectItem = async (item, itemId) => {
    if (!selectedCharacter || selectedCharacter.id <= 0) {
      console.error("Character not selected or invalid character ID.");
      return;
    }

    const updatedItems = { ...itemsCollected, [item]: true };
    setItemsCollected(updatedItems);
    localStorage.setItem('itemsCollected', JSON.stringify(updatedItems));

    try {
      const response = await addItemToInventory(selectedCharacter.id, itemId);
      if (!response.success) {
        throw new Error(response.message || 'Failed to add item to inventory');
      }
      console.log(response.message);
    } catch (error) {
      console.error('Error adding item to inventory:', error);
    }
  };

  const handleProceed = () => {
    navigate('/level-one/crossroads');
  };

  return (
    <div>
      <h2>The Armory</h2>
      <p>The armory is filled with old, dust-covered weapons. You spot a sturdy sword and a reliable shield.</p>
      <button
        onClick={() => handleCollectItem('sword', 1)}
        disabled={itemsCollected.sword}
      >
        {itemsCollected.sword ? 'Sword Collected' : 'Pick up Sword'}
      </button>
      <button
        onClick={() => handleCollectItem('shield', 2)}
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
