import React, { useState } from 'react';
import CharacterSelector from './Characters/CharacterSelector';

export default function Home({ userId }) {
  const [selectedCharacter, setSelectedCharacter] = useState(null);

  const handleCharacterSelect = (character) => {
    setSelectedCharacter(character);
    // You can save the selected character in local storage or pass it around for game start
    localStorage.setItem('selectedCharacter', JSON.stringify(character));
  };

  return (
    <div>
      <h1>Welcome to the Game</h1>
      <CharacterSelector userId={userId} onCharacterSelect={handleCharacterSelect} />

      {selectedCharacter && (
        <div>
          <h3>You have selected:</h3>
          <p>{selectedCharacter.name}</p>
          <p>Class: {selectedCharacter.class}</p>
          <p>Origin: {selectedCharacter.origin}</p>
          <button onClick={() => console.log('Start game with character', selectedCharacter)}>
            Start Game
          </button>
        </div>
      )}
    </div>
  );
}
