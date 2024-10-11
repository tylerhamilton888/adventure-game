import React, { useState, useEffect } from 'react';
import { getGenericCharacters, getCharactersByUserId } from '../managers/CharacterManager';

export default function CharacterSelector({ userId }) {
  const [characters, setCharacters] = useState([]); // Initialize as empty array
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const genericCharacters = await getGenericCharacters();
        let userCharacters = [];

        // Fetch user-specific characters only if userId is provided
        if (userId) {
          userCharacters = await getCharactersByUserId(userId);
        }

        // Combine both arrays into one list
        setCharacters([...genericCharacters, ...userCharacters]);
      } catch (error) {
        console.error("Failed to fetch characters", error);
      }
    };

    fetchCharacters();
  }, [userId]);

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
    console.log('Character selected:', character); // Perform any action when a character is selected
  };

  if (!characters.length) {
    return <div>Loading characters...</div>; // Show loading message
  }

  return (
    <div>
      <h2>Select Your Character</h2>
      <ul>
        {characters.map((character) => (
          <li key={character.id}>
            <button onClick={() => handleCharacterSelect(character)}>
              {character.name} 
              {/* Only render className and originName if they are not null */}
              ({character.className ? character.className : 'Unknown Class'}) 
              ({character.originName ? character.originName : 'Unknown Origin'})
            </button>
          </li>
        ))}
      </ul>

      {selectedCharacter && (
        <div>
          <h3>Selected Character</h3>
          <p>Name: {selectedCharacter.name}</p>
          <p>Class: {selectedCharacter.className ? selectedCharacter.className : 'Unknown Class'}</p>
          <p>Origin: {selectedCharacter.originName ? selectedCharacter.originName : 'Unknown Origin'}</p>
          <p>Health: {selectedCharacter.health}</p>
          <p>Strength: {selectedCharacter.strength}</p>
          <p>Dexterity: {selectedCharacter.dexterity}</p>
          <p>Charisma: {selectedCharacter.charisma}</p>
          <p>Weapon Skill: {selectedCharacter.weaponSkill}</p>
          <p>Toughness: {selectedCharacter.toughness}</p>
          <p>Money: {selectedCharacter.money}</p>
        </div>
      )}
    </div>
  );
}
