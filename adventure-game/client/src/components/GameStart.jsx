import React, { useEffect, useState } from 'react';

export default function GameStart() {
  const [character, setCharacter] = useState(null);

  useEffect(() => {
    const storedCharacter = JSON.parse(localStorage.getItem('selectedCharacter'));
    if (storedCharacter) {
      setCharacter(storedCharacter);
    } else {
      // Redirect back to character selection if no character is selected
      window.location.href = "/";
    }
  }, []);

  return (
    <div>
      {character ? (
        <div>
          <h1>Starting game with {character.name}</h1>
          <p>Class: {character.class}</p>
          <p>Origin: {character.origin}</p>
          {/* Game logic goes here */}
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
}
