import React, { useState, useEffect } from 'react';
import { getInventoryForCharacter } from './managers/InventoryManager'; 

export default function Inventory() {
  const [inventoryItems, setInventoryItems] = useState([]);
  const selectedCharacter = JSON.parse(localStorage.getItem('selectedCharacter'));

  useEffect(() => {
    if (selectedCharacter) {
      const fetchInventory = async () => {
        try {
          const inventory = await getInventoryForCharacter(selectedCharacter.id);
          setInventoryItems(inventory);
        } catch (error) {
          console.error("Failed to fetch inventory:", error);
        }
      };
      fetchInventory();
    }
  }, [selectedCharacter]);

  if (!selectedCharacter) {
    return <div>Please select a character first.</div>;
  }

  if (!inventoryItems.length) {
    return <div>Loading inventory...</div>;
  }

  return (
    <div>
      <h2>{selectedCharacter.name}'s Inventory</h2>
      <ul>
        {inventoryItems.map((item) => (
          <li key={item.id}>{item.name} - {item.typeName}</li>
        ))}
      </ul>
    </div>
  );
}
