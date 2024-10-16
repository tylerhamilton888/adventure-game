import React, { useState, useEffect } from 'react';
import { getInventoryForCharacter, equipItem, unequipItem, deleteItem } from './managers/InventoryManager';
import IntegratedNavigation from '../components/IntegratedNavigation';

export default function Inventory() {
  const [inventoryItems, setInventoryItems] = useState([]);
  const [notificationMessage, setNotificationMessage] = useState('');
  const [selectedItem, setSelectedItem] = useState(null);
  const selectedCharacter = JSON.parse(localStorage.getItem('selectedCharacter'));

  useEffect(() => {
    if (selectedCharacter) {
      updateInventory();
    }
  }, [selectedCharacter]);

  const updateInventory = async () => {
    if (selectedCharacter) {
      try {
        const inventory = await getInventoryForCharacter(selectedCharacter.id);
        setInventoryItems(inventory);
      } catch (error) {
        console.error("Failed to update inventory:", error);
      }
    }
  };

  const handleItemClick = (item) => {
    setSelectedItem(item);
  };

  const handleEquip = async (item) => {
    try {
      const response = await equipItem(selectedCharacter.id, item.id);
      if (response.success) {
        setNotificationMessage(`You have equipped ${item.name}`);
        updateInventory();
      } else {
        setNotificationMessage(response.message || 'You already have both hands full!');
      }
    } catch (error) {
      console.error('Failed to equip item:', error);
    }
  };

  const handleUnequip = async (item) => {
    try {
      const response = await unequipItem(selectedCharacter.id, item.id);
      if (response.success) {
        setNotificationMessage(`You have unequipped ${item.name}`);
        updateInventory();
      } else {
        setNotificationMessage('Could not unequip item.');
      }
    } catch (error) {
      console.error('Failed to unequip item:', error);
    }
  };

  const handleDelete = async (item) => {
    if (window.confirm('Warning, you cannot undo this')) {
      try {
        const response = await deleteItem(selectedCharacter.id, item.id);
        if (response.success) {
          setNotificationMessage(`Item ${item.name} deleted from inventory.`);
          updateInventory();
        } else {
          setNotificationMessage('Failed to delete item from inventory.');
        }
      } catch (error) {
        console.error('Failed to delete item:', error);
      }
    }
  };

  if (!selectedCharacter) {
    return <div>Please select a character first.</div>;
  }

  if (!inventoryItems.length) {
    return <div>Loading inventory...</div>;
  }

  return (
    <div>
      <h2>{selectedCharacter.name}'s Inventory</h2>
      {notificationMessage && <div className="notification">{notificationMessage}</div>}
      <ul>
        {inventoryItems.map((item) => (
          <li key={item.id} className="clickable-item" onClick={() => handleItemClick(item)}>
            <button className="item-button">
              {item.name} - {item.typeName} ({item.equipped ? 'Equipped' : 'Not Equipped'})
            </button>
            {item.equipped ? (
              <button onClick={() => handleUnequip(item)}>Unequip</button>
            ) : (
              <button onClick={() => handleEquip(item)}>Equip</button>
            )}
            <button onClick={() => handleDelete(item)}>Delete</button>
          </li>
        ))}
      </ul>

      {selectedItem && (
        <div className="item-details">
          <h3>Item Details</h3>
          <p><strong>Name:</strong> {selectedItem.name}</p>
          <p><strong>Type:</strong> {selectedItem.typeName}</p>
          {selectedItem.strengthModifier !== 0 && (
            <p><strong>Strength Modifier:</strong> {selectedItem.strengthModifier}</p>
          )}
          {selectedItem.dexterityModifier !== 0 && (
            <p><strong>Dexterity Modifier:</strong> {selectedItem.dexterityModifier}</p>
          )}
          {selectedItem.charismaModifier !== 0 && (
            <p><strong>Charisma Modifier:</strong> {selectedItem.charismaModifier}</p>
          )}
          {selectedItem.toughnessModifier !== 0 && (
            <p><strong>Toughness Modifier:</strong> {selectedItem.toughnessModifier}</p>
          )}
          <p><strong>Hands:</strong> {selectedItem.isTwoHanded ? 'Two-Handed' : 'One-Handed'}</p>
        </div>
      )}

      <IntegratedNavigation currentPath={window.location.pathname} showReturnButton={true} />
    </div>
  );
}
