import React, { useState, useEffect } from 'react';
import { getGenericCharacters, getCharactersByUserId } from '../managers/CharacterManager';

export default function CharacterSelector({ userId }) {
  const [characters, setCharacters] = useState([]); // Initialize as empty array
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  // Fetch both generic and user-specific characters
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const genericCharacters = await getGenericCharacters(); // Fetch default characters
        let userCharacters = [];
        
        if (userId) {
          userCharacters = await getCharactersByUserId(userId); // Fetch user-specific characters
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
    setSelectedCharacter(character); // Set the selected character for further action
  };

  const handleConfirmSelection = () => {
    if (selectedCharacter) {
      // Store the selected character in localStorage
      localStorage.setItem('selectedCharacter', JSON.stringify(selectedCharacter));
      console.log('Character stored in localStorage:', selectedCharacter);
      alert(`Character Selected: ${selectedCharacter.name}`);
    } else {
      alert('No character selected.');
    }
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
              {character.name} ({character.className}) - {character.originName}
            </button>
          </li>
        ))}
      </ul>

      {selectedCharacter && (
        <div>
          <h3>Selected Character</h3>
          <p><strong>Name:</strong> {selectedCharacter.name}</p>
          <p><strong>Class:</strong> {selectedCharacter.className}</p>
          <p><strong>Origin:</strong> {selectedCharacter.originName}</p>
          {/* Confirm selection button */}
          <button onClick={handleConfirmSelection}>Select Character</button>
        </div>
      )}
    </div>
  );
}
