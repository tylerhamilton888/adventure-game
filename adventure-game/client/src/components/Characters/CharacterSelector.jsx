import React, { useState, useEffect } from 'react';
import { getGenericCharacters, getCharactersByUserId, deleteCharacter } from '../managers/CharacterManager';

export default function CharacterSelector() {
  const [characters, setCharacters] = useState([]); 
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  // Get logged-in user's ID from localStorage
  const userProfile = JSON.parse(localStorage.getItem('userProfile'));
  const loggedInUserId = userProfile?.id;

  // Fetch both generic and user-specific characters
  useEffect(() => {
    const fetchCharacters = async () => {
      try {
        const genericCharacters = await getGenericCharacters(); // Fetch default characters
        
        let userCharacters = [];
        
        if (loggedInUserId) {
          userCharacters = await getCharactersByUserId(loggedInUserId); // Fetch user-specific characters
          
        }

        // Combine both arrays into one list
        setCharacters([...genericCharacters, ...userCharacters]);
      } catch (error) {
        console.error("Failed to fetch characters", error);
      }
    };

    fetchCharacters();
  }, [loggedInUserId]);

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character); // Set the selected character for further action
  };

  const handleConfirmSelection = () => {
    if (selectedCharacter) {
      // Store the selected character in localStorage
      localStorage.setItem('selectedCharacter', JSON.stringify(selectedCharacter));
      
      alert(`Character Selected: ${selectedCharacter.name}`);
    } else {
      alert('No character selected.');
    }
  };

  const handleDeleteCharacter = async (characterId) => {
    if (window.confirm('Are you sure you want to delete this character? This action cannot be undone.')) {
      try {
        await deleteCharacter(characterId);
        // Update the character list after deletion
        setCharacters((prevCharacters) => prevCharacters.filter((char) => char.id !== characterId));
        alert('Character deleted successfully.');
      } catch (error) {
        console.error('Failed to delete character:', error);
        alert('Failed to delete character.');
      }
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
          <li key={character.id} style={{ marginBottom: '10px' }}>
            <button onClick={() => handleCharacterSelect(character)} style={{ marginRight: '10px' }}>
              {character.name} ({character.className}) - {character.originName}
            </button>
            {/* Display the userId if available for debugging purposes */}
            
            {/* Show delete button only for characters that are not generic (IDs 1, 2, 3) */}
            {character.id > 3 && (
              <button onClick={() => handleDeleteCharacter(character.id)} style={{ backgroundColor: 'red', color: 'white' }}>
                Delete
              </button>
            )}
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
