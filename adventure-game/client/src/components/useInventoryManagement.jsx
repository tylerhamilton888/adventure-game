import { useState } from 'react';

export default function useInventoryManagement() {
  const [itemsCollected, setItemsCollected] = useState(
    JSON.parse(localStorage.getItem('itemsCollected')) || {}
  );
  const selectedCharacter = JSON.parse(localStorage.getItem('selectedCharacter'));

  const collectItem = async (item, itemId) => {
    const updatedItems = { ...itemsCollected, [item]: true };
    setItemsCollected(updatedItems);
    localStorage.setItem('itemsCollected', JSON.stringify(updatedItems));

    try {
      const response = await fetch('https://localhost:7201/api/inventory/add', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          CharacterId: selectedCharacter.id,
          ItemId: itemId,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to add item to inventory');
      }
      const data = await response.json();
      console.log(data.message);
    } catch (error) {
      console.error('Error adding item to inventory:', error);
    }
  };

  return { itemsCollected, collectItem };
}
