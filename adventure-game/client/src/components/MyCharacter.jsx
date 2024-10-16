import React, { useState, useEffect } from 'react';
import { getCharacterDetails } from './managers/CharacterManager';
import { getInventoryForCharacter } from './managers/InventoryManager';
import IntegratedNavigation from '../components/IntegratedNavigation';

export default function MyCharacter() {
  const [character, setCharacter] = useState(null);
  const [inventoryItems, setInventoryItems] = useState([]);
  const selectedCharacter = JSON.parse(localStorage.getItem('selectedCharacter'));

  useEffect(() => {
    const fetchCharacterDetails = async () => {
      try {
        const characterData = await getCharacterDetails(selectedCharacter.id);
        setCharacter(characterData);

        const inventoryData = await getInventoryForCharacter(selectedCharacter.id);
        setInventoryItems(inventoryData);
      } catch (error) {
        console.error('Failed to fetch character details:', error);
      }
    };

    if (selectedCharacter) {
      fetchCharacterDetails();
    }
  }, [selectedCharacter]);

  if (!character) {
    return <div>Loading character details...</div>;
  }

  // Calculate stat modifiers from inventory items
  const calculateModifiers = (statName) => {
    return inventoryItems.reduce((acc, item) => {
      if (item.equipped && item[`${statName}Modifier`] !== undefined) {
        return acc + item[`${statName}Modifier`];
      }
      return acc;
    }, 0);
  };

  // Calculate total stats
  const totalStat = (base, modifier) => {
    return base + (modifier || 0);
  };

  const strengthModifier = calculateModifiers('strength');
  const dexterityModifier = calculateModifiers('dexterity');
  const charismaModifier = calculateModifiers('charisma');
  const toughnessModifier = calculateModifiers('toughness');

  return (
    <div>
      <h2>Character: {character.name}</h2>
      <p><strong>Class:</strong> {character.className}</p>
      <p><strong>Origin:</strong> {character.originName}</p>
      <h3>Stats</h3>
      <p><strong>Strength:</strong> {character.strength} + {strengthModifier} = {totalStat(character.strength, strengthModifier)}</p>
      <p><strong>Dexterity:</strong> {character.dexterity} + {dexterityModifier} = {totalStat(character.dexterity, dexterityModifier)}</p>
      <p><strong>Charisma:</strong> {character.charisma} + {charismaModifier} = {totalStat(character.charisma, charismaModifier)}</p>
      <p><strong>Toughness:</strong> {character.toughness} + {toughnessModifier} = {totalStat(character.toughness, toughnessModifier)}</p>
      <p><strong>Weapon Skill:</strong> {character.weaponSkill}</p>

      <IntegratedNavigation currentPath={window.location.pathname} showReturnButton={true} />
    </div>
  );
}
